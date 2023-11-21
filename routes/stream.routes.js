const { Router } = require("express");
const {
  getAll,
  get,
  create,
  remove,
} = require("../controllers/stream.controllers.js");

module.exports = Router()
  .get("/", getAll)
  .get("/:streamId", get)
  .post("/", create)
  .delete("/", remove);
