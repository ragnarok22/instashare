import FileItem from "./FileItem"
import API from "../api"
import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"
import DownloadModal from "./DownloadModal"
import { useRouter } from "next/router"

const base_url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/"

const FileList = ({ items, setItems }) => {
  const [loading, setLoading] = useState(false)
  const { state } = useUserContext()
  const [checkResponse, setCheckResponse] = useState({})
  const [intervalId, setIntervalId] = useState()
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const startPolling = () => {
    const polling = async () => {
      const check_response = await API.checkDownload(state.token)
      setCheckResponse({
        status: check_response.status,
        data: check_response.data
      })
      return check_response
    }
    setIntervalId(setInterval(polling, 1000))
  }

  const handleDownloadAll = async (e) => {
    setLoading(true)
    const response = await API.downloadAll(state.token)

    if (response.status === 401) {
      router.push("/login")
    } else if (response.status === 400) {
      if (response.data.url) {
        // show modal to select if create a new download file or download the old one
        setShowModal(true)
        setCheckResponse({
          status: response.status,
          data: response.data
        })
        setLoading(false)
      } else {
        // still processing the files
        setLoading(true)
      }
    } else if (response.status === 200) {
      // the processint has started... Polling
      startPolling()
    }
  }

  useEffect(() => {
    if (intervalId && checkResponse.status === 200) {
      clearInterval(intervalId)
      setLoading(false)
      window.open(base_url + checkResponse.data.url, '_blank', 'noopener,noreferrer')
    }
  }, [checkResponse])

  const handleDownload = (e) => {
    showModal(false)
    window.open(base_url + checkResponse.data.url, '_blank', 'noopener,noreferrer')
  }

  const handleNewDownload = async (e) => {
    const response = await API.forceDownload(state.token)

    if (response.status === 200) {
      startPolling()
      setLoading(true)
      setShowModal(false)
    }

  }


  return (
    <section className="w-full lg:w-3/4">
      <div className="flex w-full items-center justify-between mb-4">
        <h2 className="font-semibold text-2xl">Files</h2>
        <div className="inline-flex rounded-md shadow">
          <button
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            onClick={handleDownloadAll}
            disabled={loading}
          >
            {
              loading ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 animate-spin">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            }
            Download All
          </button>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full">
          <thead className="hidden">
            <tr>
              <th>title</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <FileItem
                key={item.id}
                file={item}
                items={items}
                setItems={setItems}
              />
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <DownloadModal onClose={() => setShowModal(false)} onDownload={handleDownload} onNewDownload={handleNewDownload} />}
    </section>
  )
}

export default FileList