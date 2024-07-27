import { connect } from "@/lib/database/mongodb"
import Campground from "@/lib/models/campground"
import Review from "@/lib/models/review"
import { currentUser } from "@clerk/nextjs/server"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const PUT = async (request, { params: { id } }) => {
  try {
    const { review } = await request.json()
    const { publicMetadata: { userId } } = await currentUser()

    if (!mongoose.isValidObjectId(id)) throw ({
      message: 'Invalid campground id.',
      status: 400
    })

    await connect()

    const campground = await Campground.findById({ _id: id })

    if (!campground) throw ({
      message: 'Campground not found.',
      status: 404
    })

    const campgroundReview = await Review.create({ body: review, author: userId })

    if (!campgroundReview) throw ({
      message: 'Something went wrong.',
      status: 500
    })

    campground.reviews.push(campgroundReview)
    await campground.save()


    return NextResponse.json({
      success: true,
      message: 'Successfully added your review',
      campground
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: error.status })
  }
}