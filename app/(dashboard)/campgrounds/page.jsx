import Image from "next/image"
import { CiLocationOn } from "react-icons/ci";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

const fetchCampgrounds = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/campgrounds`, {
      cache: 'no-store'
    })

    if (!res) throw ({
      message: 'Cannot fetch campgrounds, Please try again later.',
    })

    const campgrounds = await res.json()

    return {
      data: campgrounds,
      message: 'Successfully fetched campgrounds.'
    }

  } catch (error) {
    return {
      message: error.message,
      campgrounds: []
    }
  }
}

const Campgrounds = async () => {
  const { data: { campgrounds } } = await fetchCampgrounds()

  if (!campgrounds.length) {
    return <main>
      <h1>No available campground.</h1>
    </main>
  }

  return (
    <main className="container flex flex-col gap-4 mt-4">
      {campgrounds.map(campground => {
        const { title, description, images, location, _id } = campground
        return (
          <Card className="hover:shadow-lg" key={_id}>
            <CardContent className="flex gap-5">
              <Image
                src={images[0].link}
                width={350}
                height={200}
                quality={100}
                className=" rounded-tl-md rounded-bl-md"
              />
              <div className="flex flex-col justify-between py-6 pr-8">
                <CardTitle className="mb-4 text-xl capitalize">{title}</CardTitle>
                <CardDescription className="text-black/95 mb-4">{description}</CardDescription>
                <CardDescription className="mb-4 flex gap-1"><CiLocationOn className="text-center" size={18} /> {location}</CardDescription>
                <Link href={`/campgrounds/${_id}`} className="bg-black/85 hover:bg-black/95 text-white p-2 max-w-20 text-center rounded-md">
                  View
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </main>
  )
}
export default Campgrounds