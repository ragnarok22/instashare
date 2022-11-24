import Link from "next/link"
import { useState } from "react"

const LoginForm = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // request login
  }


  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form className="bg-white px-6 py-8 rounded shadow-md text-black w-full" onSubmit={handleSubmit}>
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" />

          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          >
            {loading ? "Loading" : "Login"}
          </button>
        </form>

        <div className="text-gray-dark mt-6">
          Don't have an account? {" "}
          <Link className="no-underline border-b border-blue-400 text-blue-400" href="/register">
            Register
          </Link>.
        </div>
      </div>
    </div>
  )
}

export default LoginForm