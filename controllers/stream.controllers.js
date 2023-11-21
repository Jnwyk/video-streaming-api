const mongoose = require("mongoose");
const Stream = require("../models/stream.model.js");

const getAll = (req, res, next) => {
  res.status(200).json({ message: "getAll" });
};

const get = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

const create = (req, res, next) => {
  res.status(200).json({ message: "create" });
};

const remove = (req, res, next) => {
  res.status(200).json({ message: "remove" });
};

module.exports = {
  getAll,
  get,
  create,
  remove,
};
