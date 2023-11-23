const { Router } = require("express");
const stream = require("./stream.routes.js");
const user = require("./user.routes.js");

module.exports = Router()
  .get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to Video streaming API" })
  )
  .use("/streams", stream)
  .use("/users", user);
