import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error("Mongo_URI is missing in environment variable...");
    }
    const connection = await mongoose.connect(dbUri, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log(
      `Database Connected Successfully: ${connection.connection.host}`,
    );
  } catch (error) {
    console.error(`Database Connection Failed: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDb;
