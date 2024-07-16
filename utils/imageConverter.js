export const toBase64Handler = async (images) => {
  const promises = Array.from(images).map(async (image) => {
    const imageBuffer = await image.arrayBuffer()
    const imageArray = Array.from(new Uint8Array(imageBuffer))
    const imageData = Buffer.from(imageArray)

    return imageData.toString('base64')
  })

  const imageList = await Promise.all(promises)

  if (imageList) {
    return {
      success: true,
      images: imageList
    }
  }
}