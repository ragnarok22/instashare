import Link from "next/link"

const Navbar = () => (
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
      <Link href="/" className="flex text-blue-600 font-semibold hover:text-blue-500 cursor-pointer transition-colors duration-300">
        Home
      </Link>

      <Link href="/upload" className="flex text-gray-600 cursor-pointer transition-colors duration-300">
        Upload
      </Link>

      <Link href="/about" className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
        About Us
      </Link>

    </div>

    <div className="flex items-center space-x-5">
      <a className="flex
                    cursor-pointer transition-colors duration-300
                    font-semibold text-blue-600">

        <svg className="fill-current h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg"
          version="1.1" width="24" height="24"
          viewBox="0 0 24 24">
          <path
            d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
        </svg>

        Logout
      </a>
    </div>
  </nav>
)

export default Navbar