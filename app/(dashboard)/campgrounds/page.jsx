import Campgrounds from "@/components/Campgrounds";
import Loading from "@/components/Loading";
import { Suspense } from "react";

const CampgroundsPage = async () => {

  return (
    <Suspense fallback={<Loading />}>
      <Campgrounds />
    </Suspense>
  )
}
export default CampgroundsPage