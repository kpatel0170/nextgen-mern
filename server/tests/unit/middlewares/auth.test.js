import { HTTP_CODES, AUTH_MESSAGES } from "../../../src/config/constants";
import { auth } from "../../../src/middleware/auth.js"; 

describe("Auth Middleware Tests", () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      send: jest.fn()
    };
    mockNext = jest.fn();
  });

  it("should authorize user with required rights", async () => {
    const requiredRights = ["READ", "WRITE"]; // Replace with your required rights
    const user = {
      id: "sampleUserID",
      role: "user" // Replace with a role having required rights
      // Add other user properties if needed
    };
    mockRequest.user = user;

    await auth(...requiredRights)(mockRequest, mockResponse, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
  });

  it("should handle unauthorized user", async () => {
    const requiredRights = ["WRITE"]; // Replace with your required rights
    const user = {
      id: "sampleUserID",
      role: "user" // Replace with a role NOT having required rights
      // Add other user properties if needed
    };
    mockRequest.user = user;

    await auth(...requiredRights)(mockRequest, mockResponse, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(HTTP_CODES.UNAUTHORIZED);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: AUTH_MESSAGES.UNAUTHENTICATED
    });
  });

  // Add more test cases to cover different scenarios handled by the middleware
});
