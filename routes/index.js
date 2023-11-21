const { Router } = require("express");
const stream = require("./stream.routes.js");

module.exports = Router().use("/streams", stream);
