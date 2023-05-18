const express = require("express");

function routes(app) {
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
}

module.exports = routes;