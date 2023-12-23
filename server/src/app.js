import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import bodyParser from "body-parser";
import session from "express-session";
import compression from "compression";
import routes from "./routes/api.js";
import { errorHandler } from "./middleware/error.js";

import config from "./config/config.js";
import ApiError from "./utils/ApiError.js";
import { HTTP_CODES } from "./config/constants.js";
import googleStrategy from "./config/passport/googleStrategy.js";
import jwtStrategy from "./config/passport/jwtStrategy.js";
import metricsMiddleware from "./middleware/metrics.js";
import addTraceIdMiddleware from "./middleware/traceId.js";

const app = express();

// parse json request body
app.use(express.json());

// manage sessions
app.use(
  session({ secret: config.jwt.secret, saveUninitialized: true, resave: true })
);

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// log HTTP requests
app.use(morgan("combined"));

// enable cors
app.use(cors());
const corsOpts = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};
app.use(cors(corsOpts));

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse application/json
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

// gzip compression
app.use(compression());

// add traceId to request
app.use(addTraceIdMiddleware);

// add metrics
app.use(metricsMiddleware);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
googleStrategy(passport);
jwtStrategy(passport);

// routes
app.use("/api", routes);

// simple route
app.get("/ping", (req, res) => {
  res.json({
    message: "Server is up"
  });
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(HTTP_CODES.NOT_FOUND, "Not found"));
});

// error handler, send stacktrace only during development
app.use(errorHandler);


// const BASE_URL = "/api/v1";

export default app;
