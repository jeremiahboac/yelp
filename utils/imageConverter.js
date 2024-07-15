export const toBase64Handler = async (images) => {
  const imageList = []
  for (const image of images) {
    const imageBuffer = await image.arrayBuffer()
    const imageArray = Array.from(new Uint8Array(imageBuffer))
    const imageData = Buffer.from(imageArray)

    const imageBase64 = imageData.toString('base64')

    imageList.push(imageBase64)
  }

  return {
    success: true,
    images: imageList
  }
}