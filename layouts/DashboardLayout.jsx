import Navbar from "../components/NavBar"
import BaseLayout from "./BaseLayout"
import Footer from "../components/Footer"

const DashboardLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Navbar />
      <div>
        {children}
      </div>
      <Footer />
    </BaseLayout>
  )
}

export default DashboardLayout