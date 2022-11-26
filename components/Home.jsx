import Link from "next/link"
import { useEffect, useState } from "react"
import API from "../api"
import { useUserContext } from "../context/UserContext"
import FileList from "./FileList"
import { useRouter } from "next/router"

const Home = () => {
  const router = useRouter()
  const { state } = useUserContext()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const token = state.token
    API.listFiles(token).then(response => {
      setLoading(false)
      setFiles(response.data.results)
    }).catch(error => {
      if (error.response.status === 401) {
        router.push("/logout")
      }
    })
  }, [state])

  if (loading) {
    return <p>Loading...</p>
  }

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