const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/mern_admin";

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB Connection Established");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
