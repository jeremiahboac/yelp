import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: 'daccbw8ql',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true
})

export const uploader = async (files) => {
  try {
    const promises = files.map(async (file) => {
      const res = await cloudinary.uploader.upload(`data:image/png;base64,${file}`, {
        folder: 'YelpCamp'
      })

      const { public_id: fileName, secure_url: link } = res

      return { fileName, link }
    })

    const uploadedImages = await Promise.all(promises)

    if (uploadedImages) {
      return {
        success: true,
        images: uploadedImages
      }
    }

  } catch (error) {
    console.log(error.message)
  }
}