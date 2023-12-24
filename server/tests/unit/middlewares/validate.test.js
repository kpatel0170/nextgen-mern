import Joi from "joi";
import ApiError from "../../../src/utils/ApiError";
import { HTTP_CODES } from "../../../src/config/constants.js";
import validate from "../../../src/middleware/validate.js";

describe("Validate Middleware", () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      locals: {}
    };
    mockNext = jest.fn();
  });

  test("should validate request parameters against schema", () => {
    const schema = {
      params: Joi.object({
        id: Joi.number().required()
      })
    };

    mockRequest = {
      params: {
        id: "invalidId"
      }
    };

    validate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test("should validate request query against schema", () => {
    const schema = {
      query: Joi.object({
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).max(50).required()
      })
    };

    mockRequest = {
      query: {
        page: 0,
        limit: 60
      }
    };

    validate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test("should validate request body against schema", () => {
    const schema = {
      body: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().min(18).required()
      })
    };

    mockRequest = {
      body: {
        name: "John",
        age: "17"
      }
    };

    validate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(ApiError));
    expect(mockNext.mock.calls[0][0].statusCode).toBe(HTTP_CODES.BAD_REQUEST);
  });

  test("should pass validation and assign validated values to request object", () => {
    const schema = {
      body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
      })
    };

    mockRequest = {
      body: {
        email: "test@example.com",
        password: "testPassword"
      }
    };

    validate(schema)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(mockRequest.email).toBe("test@example.com");
    expect(mockRequest.password).toBe("testPassword");
  });
});
