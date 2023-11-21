const mongoose = require("mongoose");
const Stream = require("../models/stream.model.js");
const { NotAllowedError } = require("../errors/errors.js");

const getAll = (req, res, next) => {
  res.status(200).json({ message: "getAll" });
};

const get = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

const create = async (req, res, next) => {
  try {
    const stream = await Stream.create({ ...req.body });
    res.status(201).json({ success: true, message: "Stream created" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) err.statusCode = 400;
    next(err);
  }
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
