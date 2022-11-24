import Link from "next/link"

const LoginForm = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email" />

          <input
            type="password"
            className="block border border-gray-500 w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password" />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
          >Login</button>

          <div className="text-center text-sm text-gray-700 mt-4">
            By signing up, you agree to the {" "}
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Terms of Service
            </a> and {" "}
            <a className="no-underline border-b border-gray-700 text-gray-700" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

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