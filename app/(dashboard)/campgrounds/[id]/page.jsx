import Campground from "@/components/Campground"
import Loading from "@/components/Loading"
import { Suspense } from "react"

const CampgroundPage = async ({ params: { id } }) => {
  return (
    <Suspense fallback={<Loading />}>
      <Campground
        campId={id}
      />
    </Suspense>
  )
}
export default CampgroundPage