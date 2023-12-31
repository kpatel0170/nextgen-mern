// constants.js
export const HEADER_PARAMS = {
  CDN_LOOP: "cdn-loop",
  CF_CONNECTING_IP: "cf-connecting-ip",
  CF_IP_COUNTRY: "cf-ipcountry",
  CF_REQUEST_ID: "cf-request-id",
  CF_VISITOR: "cf-visitor",
  HOST: "host",
  VERSION_APP: "x-version-app",
  VERSION_SERVER: "x-version-server"
};

export const HTTP_CODES = {
  BAD_REQUEST: 400,
  DUPLICATE_VALUE: 409,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  METHOD_NOT_ALLOWED: 405,
  MOVED_PERMANENTLY: 301,
  NOT_ACCEPTABLE: 406,
  NOT_FOUND: 404,
  NO_CONTENT_FOUND: 204,
  OK: 200,
  PERMANENT_REDIRECT: 308,
  UNAUTHORIZED: 401,
  UPGRADE_REQUIRED: 426,
  VALIDATION_ERROR: 422
};

export const GENERAL = {
  name: "GENERAL",
  text: "General"
};

export const OAUTH2_GRANT_TYPE = {
  AUTHORIZATION_CODE: "authorization_code",
  CLIENT_CREDENTIALS: "client_credentials"
};

export const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
  DISABLED: "disabled",
  INACTIVE: "inactive",
  INVITED: "invited",
  UNBLOCKED: "unblocked"
};

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SELLER: "seller"
};

export const ROLES_RIGHTS = {
  USER: [],
  ADMIN: ["getUsers", "manageUsers"],
  SELLER: ["sellItems", "manageInventory"]
};

export const AUTH_MESSAGES = {
  FILL_DETAILS: "Please fill all the details",
  LOGIN_SUCCESS: "Login Successfully",
  REGISTER_SUCCESS: "Register Successfully",
  FAILED_LOGIN:
    "Sorry, the email / password combination is not valid. Please try again.\nIf the problem persists, kindly call support.",
  FAILED_REGISTRATION:
    "Sorry, there was an error during the registration.\nPlease try again. If the problem persists, kindly call support.",
  EXISTS_PHONE:
    "Sorry, the specified phone number is already registered in the system.\nIf you feel this is not correct, kindly call support.",
  EXISTS_EMAIL:
    "Sorry, the specified email is already registered in the system.\nIf you feel this is not correct, kindly call support.",
  EMAIL_NOT_EXISTS:
    "Sorry, the specified email is not registered in the system.\nIf you feel this is not correct, kindly call support.",
  INVALID_CREDENTIALS:
    "Sorry, the email / password combination is not valid. Please try again.\nIf the problem persists, kindly call support.",
  UNAUTHENTICATED:
    "Sorry, you are not authenticated to perform this action.\nIf you feel this is not correct, kindly call support.",
  INVALID_PARAMETERS:
    "Sorry, the request could not be processed as because of invalid parameters.",
  INVALID_PHONE: "Sorry! The specified phone number is invalid.",
  INVALID_TOKEN_VERIFICATION: "Sorry! The verification token is invalid.",
  INVALID_LOGIN: "Invalid phone number or password",
  USER_NOT_FOUND: "Sorry! The requested user could not be found."
};

export const ADDRESS_MESSAGES = {
  ADDRESS_ADDED: "The new address has been registered successfully!",
  ADDRESS_DELETE_PRIMARY:
    "Sorry, the address you are trying to delete is set as primary. Please set a new primary address to delete this one."
  // ... other messages related to addresses
};

export const CART_MESSAGES = {
  CART_NOT_CREATED: "Some error occurred while creating the cart",
  CART_NOT_FOUND: "Sorry! The requested cart could not be found!"
  // ... other messages related to cart
};

// ... other categories of messages
