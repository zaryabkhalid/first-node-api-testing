import mongoose from "mongoose"

const connectDB = async () => {
  mongoose.set("strictQuery", true)
  try {
    const { connection } = await mongoose.connect(process.env.APP_MONGODB_URI)
    console.log(`MongoDB is succcessfully connected to ${connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
