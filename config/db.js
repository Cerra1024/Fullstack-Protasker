const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("CRITICAL ERROR: MONGO_URI is missing from environmental variables.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error occurred.");
    console.error(`Error Details: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;