import { useRef, useState } from "react"
import Preview from "./Preview"
import API from "../api"
import { useRouter } from "next/router"

const UploadForm = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const [title, setTitle] = useState("")
  const dropRef = useRef()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await API.createFile({
      file, title
    })
    setLoading(false)

    if (response === null) {
      router.push("/")
    } else if (response.status === 400) {
      console.error(response.data)
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="my-2 font-medium text-2xl">Upload an Image to Share</h2>

      <form action="post" className="flex flex-col w-full lg:w-1/2" onSubmit={handleSubmit}>
        <input type="text" className="border border-gray-500 w-full p-3 rounded mb-4"
          placeholder="Image title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

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
              <Preview file={file} />
            )
            }

          </div >
        </div >

        <button
          type="submit"
          className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-4 transition-all"
        >
          {loading ? "Loading" : "Upload"}
        </button>
      </form >
    </div >
  )
}

export default UploadForm