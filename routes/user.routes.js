const { Router } = require("express");
const {
  get,
  create,
  update,
  remove,
} = require("../controllers/user.controllers.js");

module.exports = Router()
  .post("/", create)
  .get("/:userId", get)
  .patch("/streams/:userId", update)
  .delete("/:userId", remove);
