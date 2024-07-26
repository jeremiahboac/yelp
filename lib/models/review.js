import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema({
  body: {
    type: String,
    required: true,
    minLength: 10
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Review = models?.Review || model('Review', reviewSchema)

export default Review