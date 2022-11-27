import { useState } from "react"
import { NavLink } from "./NavLink"
import { navigation } from "./routes"
import API from "../../api"
import { useRouter } from "next/router"
import { useUserContext } from "../../context/UserContext"

const Navbar = () => {
  const [loading, setLoading] = useState()
  const router = useRouter()
  const { dispatch } = useUserContext();

  const handleLogout = () => {
    setLoading(true)
    API.logout().then(response => {
      if (response.status === 200) {
        dispatch({ type: "logout" });
        router.push("/login")
      }
    })
  }
  return (
    <nav className="flex justify-around py-4 bg-white/80
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10">

      <div className="flex items-center">
        <a className="cursor-pointer">
          <h3 className="text-2xl font-medium text-blue-500">
            ImageShare
          </h3>
        </a>
      </div>

      <div className="items-center hidden space-x-8 lg:flex">
        {navigation.map(item => (
          <NavLink key={item.name} href={item.href}>
            {item.icon} {item.name}
          </NavLink>
        ))}
      </div>

      <div className="flex items-center space-x-5">
        <button className="flex cursor-pointer transition-colors duration-300 font-semibold text-blue-600" onClick={handleLogout}>
          {
            loading ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 animate-spin">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              : <svg className="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg"
                version="1.1" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
              </svg>
          }

          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar