const mongoose = require("mongoose");
const logger = require("./logger");
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

module.exports = connect