import mongoose from "mongoose";
import config from "../config/config.js";
import logger from "../config/logger.js";
import ApiError from "../utils/ApiError.js";

import { HTTP_CODES } from "../config/constants.js";

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode ||
      (error instanceof mongoose.Error
        ? HTTP_CODES.BAD_REQUEST
        : HTTP_CODES.INTERNAL_SERVER_ERROR);
    const message = error.message || HTTP_CODES[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res, next) => {

  const statusCode = err.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || HTTP_CODES[statusCode];

  res.locals.errorMessage = message;
  const response = {
    code: statusCode,
    message: err.message,
    ...(config.env === "development" && { stack: err.stack })
  };

  if (config.env === "development") {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};
