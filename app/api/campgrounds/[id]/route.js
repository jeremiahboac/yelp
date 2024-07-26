import { connect } from "@/lib/database/mongodb"
import Campground from "@/lib/models/campground"
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
      .populate('author', 'email firstName lastName')
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: 'firstName lastName'
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

