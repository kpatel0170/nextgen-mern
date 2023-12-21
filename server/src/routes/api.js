import express from "express";
import config from "../config/config.js";
import authRoute from "./auth.js";
import userRoute from "./user.js";
import docsRoute from "./docs.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute
  },
  {
    path: "/user",
    route: userRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

const devRoutes = [
  // routes available only in development mode
  {
    // Path: server\src\routes\routes.js
    // Compare this snippet from server\src\routes\docs.route.js:

    path: "/docs",
    route: docsRoute
  }
];

if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
