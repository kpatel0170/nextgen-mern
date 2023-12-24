import mongoose from "mongoose";
import { errorConverter } from "../../../src/middleware/error.js";
import ApiError from "../../../src/utils/ApiError";

let mockRequest;
let mockResponse;
let mockNext;

describe("Error Middlewares", () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      locals: {},
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe("Error Converter Middleware", () => {
    test("should return the same ApiError object it was called with", () => {
      const error = new ApiError(400, "Any error");
      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test("should convert an Error to ApiError and preserve its status and message", () => {
      const error = new Error("Any error");
      error.statusCode = 400;

      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: error.message,
          isOperational: false
        })
      );
    });

    test("should convert an Error without status to ApiError with status 500", () => {
      const error = new Error("Any error");

      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: error.message,
          isOperational: false
        })
      );
    });

    test("should convert an Error without message to ApiError with default message of that http status", () => {
      const error = new Error();
      error.statusCode = 400;

      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: error.statusCode,
          message: "Bad Request",
          isOperational: false
        })
      );
    });

    test("should convert a Mongoose error to ApiError with status 400 and preserve its message", () => {
      const error = new mongoose.Error("Any mongoose error");

      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 400,
          message: error.message,
          isOperational: false
        })
      );
    });

    test("should convert any other object to ApiError with status 500 and its message", () => {
      const error = {};

      errorConverter(error, mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
      expect(mockNext).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          message: "Internal Server Error",
          isOperational: false
        })
      );
    });
  });

  describe("Error Handler Middleware", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation(() => {}); // Mock console.error
    });

    test("should send proper error response and put the error message in res.locals", () => {
      const error = new ApiError(400, "Any error");
      errorHandler(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 400,
        message: "Any error"
      });
      expect(mockResponse.locals.errorMessage).toBe("Any error");
    });

    test("should put the error stack in the response if in development mode", () => {
      const error = new ApiError(400, "Any error", true);
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      errorHandler(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 400,
        message: "Any error",
        stack: error.stack
      });
      expect(mockResponse.locals.errorMessage).toBe("Any error");

      process.env.NODE_ENV = originalEnv; // Restore original environment
    });

    test("should send internal server error status and message if in production mode and error is not operational", () => {
      const error = new ApiError(400, "Any error", false);
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      errorHandler(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 500,
        message: "Internal Server Error"
      });
      expect(mockResponse.locals.errorMessage).toBe("Any error");

      process.env.NODE_ENV = originalEnv; // Restore original environment
    });

    test("should preserve original error status and message if in production mode and error is operational", () => {
      const error = new ApiError(400, "Any error");
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      errorHandler(error, mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.send).toHaveBeenCalledWith({
        code: 400,
        message: "Any error"
      });
      expect(mockResponse.locals.errorMessage).toBe("Any error");

      process.env.NODE_ENV = originalEnv; // Restore original environment
    });
  });
});
