import Link from "next/link"
import { useState } from "react"
import Preview from "./Preview"

const Home = () => {
  const [files, setFiles] = useState([])

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-2 px-12">
      {files.length > 0 ?
        <div
          className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((file, i) => (
            <div key={i}
              className="my-1 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1"
            >
              <Preview file={file} />
            </div>
          ))}
        </div>
        : <div className="my-4 text-neutral-600 text-2xl text-center">
          There are no files. Please <Link href="/upload" className="underline text-gray-600">Upload a file</Link>
        </div>
      }
    </section>
  )
}

export default Home