import Image from "next/image"
import notFound from "@/public/notFound.svg"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Map from "@/components/Map"

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
  const { campground, geometry } = await fetchCampground(id)

  if (Object.keys(campground).length === 0) {
    return <main className="container flex flex-col items-center gap-10 mt-20">
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
    <main className="container mt-10 grid grid-cols-2 gap-4">
      <Card className="row-span-3">
        <CardContent>
          <div className="max-w-full relative">
            <Image
              src={images[0].link}
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
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

      <Card>
        <Map
          campgrounds={geometry}
          isMiniMap={true}
        />
      </Card>
    </main>
  )
}
export default Campground