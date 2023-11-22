const { Router } = require("express");
const {
  get,
  create,
  remove,
  updateStreams,
  getStreams,
} = require("../controllers/user.controllers.js");

module.exports = Router()
  .post("/", create)
  .get("/:userId", get)
  .delete("/:userId", remove)
  .patch("/streams/:userId", updateStreams)
  .get("/streams/:userId", getStreams);
