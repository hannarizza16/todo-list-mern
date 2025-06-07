import dotenv from 'dotenv'
dotenv.config();

import mongo from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

const connectDb = async () => {
  try {
    await mongo.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    // Exit process with failure
    // This is important to prevent the server from running if the database connection fails
    process.exit(1)
  }
}

export default connectDb