const mongoose = require("mongoose");
const { db_url } = require("../secret");
const connectDB = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
