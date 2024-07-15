import { z } from "zod"

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 5; //In MegaBytes

const sizeInMB = (sizeInBytes, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const campgroundSchema = z.object({
  title: z.string().min(10, {
    message: 'Title must be atleast 10 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be atleast 25 characters.'
  }),
  location: z.string().min(5, {
    message: 'Location must be atleast 5 characters.'
  }),
  images: z
    .custom()
    .refine((files) => {
      return Array.from(files ?? [])?.length !== 0
    }, "Image is required")
    .refine((files) => {
      return Array.from(files ?? [])?.length <= 5
    }, "Maximum image upload is 5.")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE
      )
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      )
    }, "File type is not supported")
})