const { Router } = require("express");
const stream = require("./stream.routes.js");
const user = require("./user.routes.js");

module.exports = Router().use("/streams", stream).use("/users", user);
