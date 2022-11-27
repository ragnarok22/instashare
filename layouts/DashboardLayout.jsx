import { Navbar2 } from "../components/navbar"
import BaseLayout from "./BaseLayout"
import Footer from "../components/Footer"

const DashboardLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Navbar2 />
      <div className="py-16 px-2">
        {children}
      </div>
      <Footer />
    </BaseLayout>
  )
}

export default DashboardLayout