import FileItem from "./FileItem"

const FileList = ({ items }) => {
  return (
    <section className="w-full lg:w-3/4">
      <div className="flex w-full items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl">Files</h2>
        <div className="inline-flex rounded-md shadow">
          <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto">
          <thead className="hidden">
            <tr>
              <th>title</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <FileItem
                key={i}
                title={item.title}
                file_url={item.file}
                size={item.size}
                created_at={item.created_at}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default FileList