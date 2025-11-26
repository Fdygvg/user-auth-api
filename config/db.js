import express from "express";
import mongoose from "mongoose";

const mongouri = process.env.MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("'✅ MongoDB Connected'");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};
export default connectDB;
