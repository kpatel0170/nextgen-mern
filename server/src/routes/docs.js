import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerDefinition from "../docs/openapi.js";

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["src/docs/*.yml", "src/routes/*.js"]
});

router.use("/", swaggerUi.serve);
router.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

export default router;
