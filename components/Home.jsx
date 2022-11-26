import Link from "next/link"
import { useEffect, useState } from "react"
import Preview from "./Preview"
import API from "../api"
import { useUserContext } from "../context/UserContext"
import axios from "axios"
import FileList from "./FileList"

const Home = () => {
  const { state } = useUserContext()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const token = state.token
    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 1000,
      headers: { Authorization: `Bearer ${token}` }
    });
    instance.get("files/").then(response => {
      setLoading(false)
      setFiles(response.data.results)
    }).catch(error => {
      console.log(error)
    })
  }, [state])

  if (loading) {
    return <p>Loading...</p>
  }

  console.log(files)

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-2 px-12">
      {files.length > 0 ?
        <div className="flex justify-center">
          <FileList items={files} />
        </div>
        : <div className="my-4 text-neutral-600 text-2xl text-center">
          There are no files. Please <Link href="/upload" className="underline text-gray-600">Upload a file</Link>
        </div>
      }
    </div>
  )
}

export default Home