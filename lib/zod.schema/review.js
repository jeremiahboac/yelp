import * as z from "zod"

export const reviewSchema = z.object({
  review: z.string().min(10, { message: 'Review must be atleast 10 characters.' })
})