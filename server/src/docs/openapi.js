// eslint-disable-next-line
import packageJson from "../../package.json" assert { type: "json" };
import config from "../config/config.js";

const version = packageJson.version;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "node-back API",
    version,
    description: "API Documentation"
  },
  servers: [
    {
      url: config.siteUrls.serverURL
    }
  ]
};

export default swaggerDefinition;
