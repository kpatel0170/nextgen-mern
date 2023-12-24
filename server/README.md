# node-back

A monorepo boilerplate for rapid and scalable development with with Node.js, Express, and MongoDB

## Installation

Read on on how to set up this for development.

Clone the repo.

```bash
$ git clone https://github.com/kpatel0170/node-back.git
$ cd node-back
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

Run the dev server

You are good to go, server will be available on `https://localhost:3001`

```bash
$ npm run dev
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Adding new Features](#adding-new-features)
- [Contributing](#contributing)

## Features

- Basic Authentication with JWT Tokens/passport
- Password reset and email verificaiton workflows.
- Email helper ready just import and use.
- Included CORS.
- API validations added using joi.
- Role-based authentication
- Light-weight project.
- Linting with [Eslint](https://eslint.org/) and Prettier.
- API documentation with Open API/swagger.
- Security: set security HTTP headers using helmet.
- gzip compression with compression.
- Docker support and git hooks with husky.

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-back

# JWT
# JWT secret key
JWT_SECRET=thisisasamplesecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=email-server
SMTP_PORT=587
SMTP_USERNAME=email-server-username
SMTP_PASSWORD=email-server-password
EMAIL_FROM=info@example.com
```

## Scripts

```bash
npm run lint       # lints code and check formatting
npm run lint:fix   # lints code, check formatting and tries to fix found problems
npm run start      # starts server
npm run start:dev  # starts server in watch mode, waiting for file changes
npm run test       # runn all tests in watch mode, waiting for file changes
npm run test:cov   # runn all tests and report coverage
npm run validate   # runs lint and test scripts for files on git's staging area
```

## Project Structure

```
src\
 |--config\         # env vars and configs
 |--controllers\    # Route controllers
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models
 |--routes\         # Routes
 |--services\       # Business logic
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--server.js        # App entry point
```

## Adding new Features

### Creating new models

If you need to add more models to the project just create a new file in `/models/` and use them in the controllers.

### Creating new routes

If you need to add more routes to the project just create a new file in `/routes/` and add it in `/routes/routers.js` it will be loaded dynamically.

### Creating new controllers

If you need to add more controllers to the project just create a new file in `/controllers/` and use them in the routes.

### Creating new services

If you need to add more services to the project just create a new file in `/services/` and use them in controllers.

## Inspirations

- [danielfsousa/express-rest-es2017-boilerplate](https://github.com/danielfsousa/express-rest-es2017-boilerplate)
- [madhums/node-express-mongoose](https://github.com/madhums/node-express-mongoose)
- [kunalkapadia/express-mongoose-es6-rest-api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## Contributing

We welcome contributions to the project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature: `git checkout -b new-feature`.
3. Make the changes to the codebase
