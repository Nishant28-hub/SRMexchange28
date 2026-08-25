import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI && !process.env.MONGO_URI.includes("127.0.0.1") && !process.env.MONGO_URI.includes("localhost")) {
      const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    }

    try {
      const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rexchange_srm", {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (localErr) {
      console.log("Local MongoDB instance not active. Starting embedded in-memory MongoDB...");
    }

    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`In-memory MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
