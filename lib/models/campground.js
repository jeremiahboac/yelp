import { Schema, model, models } from "mongoose";

const imageSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
})

const campgroundSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  images: [imageSchema],
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Campground = models?.Campground || model("Campground", campgroundSchema)

export default Campground