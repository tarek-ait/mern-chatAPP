import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to the database successfully");
  } catch (err) {
    console.error("error connecting to the database", err);
  }
};
