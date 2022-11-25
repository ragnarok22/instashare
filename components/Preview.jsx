const Preview = ({ file }) => {
  const loadFile = (file) => {
    const blobUrl = URL.createObjectURL(file)

    return blobUrl
  }

  const humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i]
    )
  }

  return (
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

export default Preview