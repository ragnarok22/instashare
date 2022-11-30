import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import API from "../api"

const RegisterForm = () => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
    email: ""
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const updateInfo = (value, type) => {
    const updatedValue = { [type]: value };
    setUserInfo(userInfo => ({
      ...userInfo,
      ...updatedValue
    }));
  }

  const checkPasswords = (e) => {
    updateInfo(e.target.value, "password2")
    if (userInfo.password !== e.target.value) {
      setErrors({
        password: ["Passwords must match."]
      })
    } else {
      setErrors(current => {
        const { password, ...rest } = current
        return rest
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      password2: userInfo.password2
    }
    API.signup(data).then(response => {
      if (response.status === 201) {
        router.push("/login")
      } else if (response.status === 400) {
        // form error
        setErrors(response.data)
      }
      setLoading(false)
    })
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="flex flex-col">
          {
            errors && Object.keys(errors).map((field, i) => (
              <div key={i} className="text-sm text-red-600">
                {field}
                <ul className="list-disc">
                  {errors[field].map((error, j) => (
                    <li key={j} className="mb-2 w-max text-red-400">{error}</li>
                  ))}
                </ul>
              </div>
            ))
          }
        </div>

        <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" onSubmit={handleSubmit}>
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <div className="flex w-full mb-4">
            <input
              type="text"
              className="block border border-gray-500 w-full p-3 rounded mr-1"
              required
              value={userInfo.firstName}
              onChange={e => updateInfo(e.target.value, "firstName")}
              placeholder="First Name" />

            <input
              type="text"
              className="block border border-gray-500 w-full p-3 rounded"
              required
              value={userInfo.lastName}
              onChange={e => updateInfo(e.target.value, "lastName")}
              placeholder="Last Name" />
          </div>

          <input
            type="text"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            required
            value={userInfo.username}
            onChange={e => updateInfo(e.target.value, "username")}
            placeholder="Username" />

          <input
            type="email"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            required
            value={userInfo.email}
            onChange={e => updateInfo(e.target.value, "email")}
            placeholder="Email" />

          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            required
            value={userInfo.password}
            onChange={e => updateInfo(e.target.value, "password")}
            placeholder="Password" />
          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            required
            value={userInfo.password2}
            onChange={checkPasswords}
            placeholder="Confirm Password" />

          <button
            type="submit"
            disabled={loading || errors.password}
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