import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: 'daccbw8ql',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true
})

export const uploader = async (files) => {
  try {
    const uploadedImgs = await Promise.all(files.map(async (file) => {
      const res = await cloudinary.uploader.upload(file, {
        folder: 'YelpCamp'
      })

      if (!res) throw ({
        message: 'Something went wrong.',
        images: [],
        success: false
      })

      const { public_id: fileName, secure_url: link } = res

      return { fileName, link }
    }))

    return {
      success: true,
      images: uploadedImgs
    }
  } catch (error) {
    console.log(error.message)
  }
}