import Navbar from "@/components/Navbar"

const DashboardLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      <div className=" transform translate-y-20 pb-10 fixed w-full">
        {children}
      </div>
    </main>
  )
}
export default DashboardLayout