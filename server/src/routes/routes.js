const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");

function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.use("/api/users", userRouter);
}

module.exports = routes;