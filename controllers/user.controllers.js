const mongoose = require("mongoose");
const User = require("../models/user.model.js");

const get = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

const create = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

const update = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

const remove = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

module.exports = {
  get,
  create,
  update,
  remove,
};
