import Link from "next/link"
import { useState } from "react"

const RegisterForm = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
    email: ""
  })
  const [loading, setLoading] = useState(false)

  const updateInfo = (value, type) => {
    const updatedValue = { [type]: value };
    setUserInfo(userInfo => ({
      ...userInfo,
      ...updatedValue
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // create user
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" onSubmit={handleSubmit}>
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <div className="flex w-full mb-4">
            <input
              type="text"
              className="block border border-gray-500 w-full p-3 rounded mr-1"
              value={userInfo.firstName}
              onChange={e => updateInfo(e.target.value, "firstName")}
              placeholder="First Name" />

            <input
              type="text"
              className="block border border-gray-500 w-full p-3 rounded"
              value={userInfo.lastName}
              onChange={e => updateInfo(e.target.value, "lastName")}
              placeholder="Last Name" />
          </div>

          <input
            type="text"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            value={userInfo.username}
            onChange={e => updateInfo(e.target.value, "username")}
            placeholder="Username" />

          <input
            type="text"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            value={userInfo.email}
            onChange={e => updateInfo(e.target.value, "email")}
            placeholder="Email" />

          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            value={userInfo.password}
            onChange={e => updateInfo(e.target.value, "password")}
            placeholder="Password" />
          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            value={userInfo.password2}
            onChange={e => updateInfo(e.target.value, "password2")}
            placeholder="Confirm Password" />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          >
            {loading ? "Loading" : "Create Account"}
          </button>

          <div className="text-center text-sm text-gray-700 mt-4">
            By signing up, you agree to the  {" "}
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Terms of Service
            </a> and {" "}
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Privacy Policy  {" "}
            </a>
          </div>
        </form>

        <div className="text-gray-700 mt-6">
          Already have an account?  {" "}
          <Link className="no-underline border-b border-blue-400 text-blue-400" href="/login">
            Log in
          </Link>.
        </div>
      </div>
    </div>
  )
}

export default RegisterForm