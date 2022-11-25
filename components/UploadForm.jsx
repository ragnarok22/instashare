import { createRef, useRef, useState } from "react"

const UploadForm = () => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const dropRef = useRef()
  const previewRef = useRef()

  const humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i]
    )
  }

  const loadFile = (file) => {
    const blobUrl = URL.createObjectURL(file)

    return blobUrl
  }

  const handleDragOver = (e) => {
    dropRef.current.classList.add("border-blue-400")
    dropRef.current.classList.add("ring-4")
    dropRef.current.classList.add("ring-inset")
  }

  const handleDragLeave = (e) => {
    dropRef.current.classList.remove("border-blue-400")
    dropRef.current.classList.remove("ring-4")
    dropRef.current.classList.remove("ring-inset")
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="my-2 font-medium text-2xl">Upload an Image to Share</h2>

      <form action="post" className="flex flex-col w-full lg:w-1/2">
        <input type="text" className="border border-gray-500 w-full p-3 rounded mb-4" placeholder="Image title" />

        <div className="bg-white rounded w-full mx-auto">
          <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
            <div className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer" ref={dropRef}>
              <input accept="*" type="file" className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                onChange={handleFile}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragLeave}
              />

              <div className="flex flex-col items-center justify-center py-10 text-center">
                <svg className="w-6 h-6 mr-1 text-current-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="m-0">Drag your files here or click in this area.</p>
              </div>
            </div>

            {file && (
              <div className="w-full lg:w-1/2">
                <div className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded select-none"
                  style={{ paddingTop: "100%" }}
                >
                  {file.type.includes("audio/") && (
                    <svg className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  )}
                  {file.type.includes("application/") && (
                    <svg className="absolute w-12 h-12 text-gray-400 transform top-1/2 -translate-y-2/3"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  {file.type.includes("image/") && (
                    <img className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview" ref={previewRef}
                      src={loadFile(file)} />
                  )}
                  {file.type.includes("video/") && (
                    <video className="absolute inset-0 object-cover w-full h-full border-4 border-white pointer-events-none preview"
                      src={loadFile(file)} type="video/mp4" />
                  )}

                  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                    <span className="w-full font-bold text-gray-900 truncate">
                      {file ? file.name : "Loading"}
                    </span>
                    <span className="text-xs text-gray-900">{file ? humanFileSize(file.size) : "..."}</span>
                  </div>
                </div>
              </div>
            )
            }

          </div >
        </div >

        <button
          type="submit"
          className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-4"
        >
          {loading ? "Loading" : "Login"}
        </button>
      </form >
    </div >
  )
}

export default UploadForm