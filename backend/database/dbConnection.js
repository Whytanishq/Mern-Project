import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RESTURANT"
    });
    console.log("Connected to database successfully!");
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    process.exit(1);
  }
};

export default dbConnection;