import Navbar from "@/components/Navbar"

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className=" transform translate-y-24">
        {children}
      </div>
    </main>
  )
}
export default DashboardLayout