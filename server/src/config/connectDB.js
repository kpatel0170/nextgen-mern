import mongoose from "mongoose";
import logger from "./logger.js";
import config from "./config.js";

const connect = async () => {
  try {
    await mongoose.connect(config.mongoose.url).then(() => {
      logger.info("Connected to MongoDB");
    });
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
};

export default connect;
