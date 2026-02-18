// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);

//     console.log(`MongoDB connected ✅ Host: ${conn.connection.host}`);
//   } catch (err) {
//     console.error("MongoDB connection error❌ :", err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState;
    console.log(`MongoDB connected ✅ Host: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error ❌:", err.message);
    throw err; // do NOT use process.exit in serverless
  }
};

module.exports = connectDB;

