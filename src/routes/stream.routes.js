const { Router } = require("express");
const {
  getAll,
  get,
  create,
  remove,
} = require("../controllers/stream.controllers.js");

module.exports = Router()
  .get("/", getAll)
  .post("/", create)
  .get("/:streamId", get)
  .delete("/:streamId", remove);
