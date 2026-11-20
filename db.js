const mongoose = require("mongoose");

let isMongoConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/mern_ecommerce";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500 // Fast fail if local mongo isn't running
    });
    isMongoConnected = true;
    console.log(`\x1b[32m✔ MongoDB Connected Successfully: ${conn.connection.host}\x1b[0m`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`\x1b[33m⚠ MongoDB connection skipped (${error.message}).\x1b[0m`);
    console.log(`\x1b[36m⚡ Running with fast Built-in Mock Store (No MongoDB setup required to test!)\x1b[0m`);
  }
};

const getMongoStatus = () => isMongoConnected;

module.exports = { connectDB, getMongoStatus };
