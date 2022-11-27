import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import API from "../api"
import { useUserContext } from "../context/UserContext"
import { useRouter } from "next/router"
import UpdateModal from "./UpdateModal"
import { getIconFileType } from "../utils"

const FileItem = ({ file, items, setItems }) => {
  dayjs.extend(relativeTime)
  const [showDelete, setShowDelete] = useState()
  const [showUpdate, setShowUpdate] = useState()
  const [loading, setLoading] = useState(false)
  const { state } = useUserContext()
  const router = useRouter()

  const handleDelete = async (e) => {
    setLoading(true)
    const response = await API.deleteFile(file.id, state.token)

    if (response.status === 401) {
      router.push("/login")
    }
    if (response.status === 204) {
      // the file has been deleted, update the items
      setItems(prev => ([...prev.filter(item => item.id !== file.id)]))
    }
  }

  const handleUpdate = async (e, title) => {
    setLoading(true)
    e.preventDefault()
    const response = await API.updateFile(file.id, title, state.token)

    if (response.status === 401) {
      router.push("/login")
    }

    if (response.status === 200) {
      setItems(items.map(item => {
        if (item.id === file.id) {
          return { ...item, title }
        }
        return item
      }))
    }
    setLoading(false)
    setShowUpdate(false)
  }

  const getFileType = (filename) => {
    const extension = filename.split(".").pop().toLowerCase()
    return getIconFileType(extension)
  }

  return (
    <tr>
      <td className="flex items-center my-2">
        <p className="pr-3">
          {getFileType(file.file)}
        </p>
        <div className="flex flex-col">
          <a
            href={file.file}
            className="text-lg text-blue-700 underline"
            target="_blank"
            rel="noreferrer"
          >
            {file.title}
          </a>
          <p className="text-gray-500 text-sm">{file.size}</p>
        </div>
      </td>
      <td className="px-2">Created {dayjs(file.created_at).fromNow(true)} ago</td>
      <td className="flex items-center justify-center">
        <button className="p-1" onClick={e => setShowUpdate(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
        {showUpdate ? (
          <UpdateModal loading={loading} file={file} onClose={() => setShowUpdate(false)} onAccept={handleUpdate} />
        ) : null}
        <button className="p-1" type="button" onClick={e => setShowDelete(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
        {showDelete ? (
          <DeleteModal loading={loading} onClose={() => setShowDelete(false)} onAccept={handleDelete} />
        ) : null}
      </td>
    </tr>
  )
}
export default FileItem