import { connect } from "@/lib/database/mongodb"
import Campground from "@/lib/models/campground"
import Review from "@/lib/models/review"
import User from "@/lib/models/user"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (request, { params: { id } }) => {
  try {

    if (!mongoose.isValidObjectId(id)) throw ({
      campground: {},
      geometry: {},
      message: 'Invalid campground id.',
      status: 400
    })

    await connect()
    const campground = await Campground.findById({ _id: id })
      .populate('author', 'email firstName lastName', User)
      .populate({
        path: "reviews",
        model: Review,
        options: {
          sort: {
            createdAt: 'desc'
          }
        },
        populate: {
          path: "author",
          select: 'firstName lastName',
          model: User
        }
      })

    if (!campground) throw ({
      campground: {},
      geometry: {},
      message: 'Campground not found',
      status: 404
    })

    if (campground) {
      const geoData = [{
        type: "Feature",
        geometry: campground.geometry
      }]

      return NextResponse.json({
        success: true,
        campground,
        geometry: {
          type: "FeatureCollection",
          features: geoData
        },
        message: 'Successfully fetch campground'
      })
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      geometry: error.geometry,
      campground: error.campground
    }, { status: error.status })
  }
}

