import Navbar from "@/components/Navbar"

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className=" transform translate-y-20 pb-10">
        {children}
      </div>
    </main>
  )
}
export default DashboardLayout