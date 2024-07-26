import Image from "next/image"
import notFound from "@/public/notFound.svg"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Map from "@/components/Map"
import ImageSwiper from "@/components/ImageSwiper"
import ReviewForm from "@/components/ReviewForm"

const fetchCampground = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campgrounds/${id}`, {
      cache: 'no-store'
    })
    const data = await res.json()
    return data
  } catch (error) {
    const { success, message, campground } = error
    return {
      success,
      message,
      campground
    }
  }
}

const Campground = async ({ params: { id } }) => {
  const camp = await fetchCampground(id)

  const { campground, geometry } = camp

  if (!Object.keys(campground).length) {
    return <main className="container flex flex-col items-center gap-10 mt-20 transform translate-y-20">
      <Image
        src={notFound}
        width={450}
        height={450}
        alt="Page not found"
        priority={true}
      />
      <div className="text-center">
        <h2 className="text-2xl mb-4">Campground not found.</h2>
        <Link href={"/campgrounds"} className="hover:underline">Back to campgrounds</Link>
      </div>
    </main>
  }

  const { title, images, description, location, author } = campground

  return (
    <main className="container mt-10 grid grid-cols-2 gap-4 transform translate-y-20">
      <Card className="max-h-[620px]">
        <CardContent>
          <div className="max-w-full relative">
            <ImageSwiper
              images={images}
            />
          </div>
          <div className="p-4">
            <CardTitle className="mb-4 text-xl capitalize">{title}</CardTitle>
            <CardDescription className="text-black/95 mb-4 pb-2 border-b border-b-gray-300">{description}</CardDescription>
            <CardDescription className="border-b border-b-gray-300 mb-4 pb-2">Location: {location}</CardDescription>
            <CardDescription >Author: {author.firstName} {author.lastName}</CardDescription>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col pt-[1px] gap-2">
        <Map
          campgrounds={geometry}
          isMiniMap={true}
        />
        <ReviewForm />

      </div>
    </main>
  )
}
export default Campground