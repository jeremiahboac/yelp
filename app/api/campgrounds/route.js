import { uploader } from "@/lib/actions/cloudinary.action"
import { connect } from "@/lib/database/mongodb"
import Campground from "@/lib/models/campground"
import User from "@/lib/models/user"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const GET = async () => {
  try {
    const campground = await Campground.find({})
      .populate('author', 'email', User)
      .sort({ createdAt: 'desc' })

    return NextResponse.json({
      success: true,
      campground
    }, { status: 200 })

  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false
    }, { status: error.status })
  }
}

export const POST = async (request) => {
  try {
    const data = await request.json()
    const { publicMetadata: { userId } } = await currentUser()

    if (!userId) throw ({
      message: 'You must be logged in to create a new campground.',
      status: 401
    })

    const { success, images } = await uploader(data.images)

    if (success) {
      await connect()
      const campground = await Campground.create({ ...data, images, author: userId })

      if (!campground) throw ({
        message: 'Something went wrong.',
        status: 500
      })

      return NextResponse.json({
        success: true,
        message: 'Successfully created new campground.',
        campground
      })
    }
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false
    }, { status: error.status })
  }
}