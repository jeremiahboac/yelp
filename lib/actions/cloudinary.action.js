import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: 'daccbw8ql',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true
})

export const uploader = async (files) => {
  try {
    const imageUploadPromises = []
    let uploadedImages
    for (const file of files) {
      const res = await cloudinary.uploader.upload(`data:image/png;base64,${file}`, {
        folder: 'YelpCamp'
      })

      const { public_id: fileName, secure_url: link } = res
      imageUploadPromises.push({
        fileName,
        link
      })

      uploadedImages = await Promise.all(imageUploadPromises)
    }

    if (uploadedImages?.length > 0) {
      return {
        success: true,
        images: uploadedImages
      }
    }

  } catch (error) {
    console.log(error.message)
  }
}