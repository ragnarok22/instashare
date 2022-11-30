import Navbar from "../components/navbar"
import BaseLayout from "./BaseLayout"
import Footer from "../components/Footer"

const DashboardLayout = ({ children, className }) => {
  return (
    <BaseLayout>
      <Navbar />
      <div className={`py-6 px-2 ${className || ""}`}>
        {children}
      </div>
      <Footer />
    </BaseLayout>
  )
}

export default DashboardLayout