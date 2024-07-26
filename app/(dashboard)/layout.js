import Navbar from "@/components/Navbar"

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}
export default DashboardLayout