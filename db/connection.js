import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
