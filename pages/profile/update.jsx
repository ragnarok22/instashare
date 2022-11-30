import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api";
import { useUserContext } from "../../context/UserContext";
import Loading from "../../components/Loading"
import { useRouter } from "next/router";

export default function UpdateProfile() {
  const [userInfo, setUserInfo] = useState({})
  const { state } = useUserContext()
  const [loading, setLoading] = useState(false)
  const [loadingPage, setLoadingPage] = useState(true)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      setLoadingPage(true)
      const response = await API.getUser(state.token)

      if (response.status === 200) {
        setUserInfo(response.data)
      }
      setLoadingPage(false)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // get non null values
    const data = Object.fromEntries(
      Object.entries(userInfo).filter(([key, value]) => !!value)
    )

    const response = await API.updateUser(userInfo.id, data, state.token)
    router.push("/profile")

    setLoading(false)
  }

  const updateUserInfo = (value, type) => {
    const updatedValue = { [type]: value };
    setUserInfo(userInfo => ({
      ...userInfo,
      ...updatedValue
    }));
  }

  if (loadingPage) {
    return <Loading />
  }

  return (
    <DashboardLayout className="flex justify-center">
      <div className="flex w-11/12">
        <div className="flex flex-col justify-start items-center h-fit bg-gray-50 p-4 rounded-lg w-1/4 mr-3 shadow-sm hover:shadow-md transition-all duration-300">
          <img src="https://flowbite.com/application-ui/demo/images/users/jese-leos-2x.png" width="300px" height="300px" />
          <h2 className="text-center text-lg font-medium mt-3">{userInfo?.get_full_name}</h2>
        </div>

        <div className="bg-gray-50 px-6 py-8 rounded-lg w-3/4 shadow-sm hover:shadow-md transition-all duration-300">
          <h3 className="font-semibold text-2xl mb-3">Personal Information</h3>

          <form action="post" onSubmit={handleSubmit}>
            <div className="flex w-full mb-4">
              <label className="w-full text-gray-700 mr-1">
                First name
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full p-2 mt-1 border border-solid border-gray-300 rounded transition ease-in-out m-0 px-3 py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={userInfo.first_name}
                  onChange={e => updateUserInfo(e.target.value, "first_name")}
                />
              </label>

              <label className="w-full text-gray-700 ml-1">
                Last name
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full p-2 mt-1 border border-solid border-gray-300 rounded transition ease-in-out m-0 px-3 py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={userInfo.last_name}
                  onChange={e => updateUserInfo(e.target.value, "last_name")}
                />
              </label>
            </div>

            <div className="flex w-full mb-4">
              <label className="w-full text-gray-700 mr-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" className="mr-1">
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                  </svg>
                  GitHub Profile
                </div>
                <input
                  type="url"
                  placeholder="GitHub"
                  className="w-full p-2 mt-1 border border-solid border-gray-300 rounded transition ease-in-out m-0 px-3 py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={userInfo.github ?? ""}
                  onChange={e => updateUserInfo(e.target.value, "github")}
                />
              </label>

              <label className="w-full text-gray-700 ml-1">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                    <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429" />
                  </svg>
                  Twitter Profile
                </div>
                <input
                  type="url"
                  placeholder="Twitter"
                  className="w-full p-2 mt-1 border border-solid border-gray-300 rounded transition ease-in-out m-0 px-3 py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={userInfo.twitter ?? ""}
                  onChange={e => updateUserInfo(e.target.value, "twitter")}
                />
              </label>
            </div>

            <div className="flex w-full mb-8">
              <label className="w-full text-gray-700 mr-1">
                About yourself
                <input
                  type="text"
                  placeholder="Ex: Software Engineer"
                  className="w-full p-2 mt-1 border border-solid border-gray-300 rounded transition ease-in-out m-0 px-3 py-1.5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={userInfo.about ?? ""}
                  onChange={e => updateUserInfo(e.target.value, "about")}
                />
              </label>
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="text-red-600"
              >
                Delete account
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-1/3 bg-blue-700 rounded-xl p-2 text-white"
              >
                {loading ? "Loading" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}


