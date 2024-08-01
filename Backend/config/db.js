const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("../logger");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });


const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);

    logger.info(`MongoDB connection: Success ${process.env.MONGO_URL} ${process.env.NODE_ENV}`);
  } catch (error) {
    logger.error(`Error:  ${error.message}`);
    process.exit();
  }
};


module.exports = connectDB;
