const express = require("express");
const authRouter = require("./auth.router.js");
const userRouter = require("./user.router.js");

function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    app.use("/api/auth", authRouter);
    app.use("/api/users", userRouter);

}

module.exports = routes;