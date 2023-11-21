const mongoose = require("mongoose");
const Stream = require("../models/stream.model.js");
const { NotAllowedError, IdNotFoundError } = require("../errors/errors.js");

const getAll = async (req, res, next) => {
  try {
    const streams = await Stream.find();
    res.status(200).json({ success: true, streams: streams });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const streamId = req.params.streamId;
    const stream = await Stream.findById(streamId);
    if (!stream) {
      throw new IdNotFoundError();
    }
    res.status(200).json({ success: true, stream: stream });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) err = new IdNotFoundError();
    next(err);
  }
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
