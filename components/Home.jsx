import Link from "next/link"
import { useEffect, useState } from "react"
import API from "../api"
import { useUserContext } from "../context/UserContext"
import FileList from "./FileList"
import { useRouter } from "next/router"
import Loading from "./Loading"

const Home = () => {
  const router = useRouter()
  const { state, dispatch } = useUserContext()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true)
    API.listFiles().then(response => {
      console.log(response)
      if (response.status === 200) {
        setFiles(response.data.results)
      }
      setLoading(false)
    })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [state])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-2 px-2 lg:px-12">
      {files && files.length > 0 ?
        <div className="flex justify-center">
          <FileList items={files} setItems={setFiles} />
        </div>
        : <div className="my-4 text-neutral-600 text-2xl text-center">
          There are no files. Please <Link href="/upload" className="underline text-gray-600">Upload a file</Link>
        </div>
      }
    </div>
  )
}

export default Home