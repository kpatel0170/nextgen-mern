import dotenv from "dotenv";
import Joi from "joi";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid("production", "development", "test").required(),
  PORT: Joi.number().default(8000),
  MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  JWT_SECRET: Joi.string().required().description("JWT secret key"),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    .default(30)
    .description("minutes after which access tokens expire"),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    .default(30)
    .description("days after which refresh tokens expire"),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description("minutes after which reset password token expires"),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description("minutes after which verify email token expires"),
  SMTP_HOST: Joi.string().description("server that will send the emails"),
  SMTP_PORT: Joi.number().description("port to connect to the email server"),
  SMTP_USERNAME: Joi.string().description("username for email server"),
  SMTP_PASSWORD: Joi.string().description("password for email server"),
  EMAIL_FROM: Joi.string().description(
    "the from field in the emails sent by the app"
  ),
  GOOGLE_CLIENT_ID: Joi.string().description("Google Client ID"),
  GOOGLE_CLIENT_SECRET: Joi.string().description("Google Client Secret"),
  GOOGLE_CALLBACK_URL: Joi.string().description("Google Callback URL"),
  CLIENT_URL: Joi.string().description("Client URL for development"),
  SERVER_URL: Joi.string().description("Server URL for development"),
  OTEL_ENABLED: Joi.boolean().description("OpenTelemetry enabled"),
  OTEL_SERVICE_NAME: Joi.string().description("OpenTelemetry service name"),
  OTEL_EXPORTER_JAEGER_ENDPOINT: Joi.string().description(
    "OpenTelemetry Jaeger exporter endpoint"
  )
}).unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV || "development",
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET || "your_jwt_secret",
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES || 30,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS || 30,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES || 10,
    verifyEmailExpirationMinutes:
      envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES || 10
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  },
  google: {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: envVars.GOOGLE_CALLBACK_URL || "/auth/google/callback"
  },
  siteUrls: {
    clientURL: envVars.CLIENT_URL || "http://localhost:3000",
    serverURL: envVars.SERVER_URL || "http://localhost:3001"
  },
  openelementry: {
    enabled: envVars.OTEL_ENABLED || false,
    serviceName: envVars.OTEL_SERVICE_NAME,
    endpoint: envVars.OTEL_EXPORTER_JAEGER_ENDPOINT
  }
};

export default config;
