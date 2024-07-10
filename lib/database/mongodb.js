import mongoose from "mongoose";

export const connect = async () => {
  const connectionState = mongoose.connection.readyState

  if (connectionState === 1) {
    console.log('Already connected to database.')
    return
  }

  if (connectionState === 2) {
    console.log('Connecting to database....')
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'yelp_db'
    })

    if (db) console.log('Successfully connected to database.')
  } catch (error) {
    console.log(`ERROR: ${error.message}`)
  }
}