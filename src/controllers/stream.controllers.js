const mongoose = require("mongoose");
const Stream = require("../models/stream.model.js");
const { IdNotFoundError } = require("../errors/errors.js");

/**
 * Retrieve all streams from the database
 */
const getAll = async (req, res, next) => {
  try {
    const streams = await Stream.find();
    res.status(200).json({ success: true, streams: streams });
  } catch (err) {
    next(err); // pass error to error middleware
  }
};

/**
 * Retrieve specified stream from the database
 */
const get = async (req, res, next) => {
  try {
    const streamId = req.params.streamId;
    const stream = await Stream.findById(streamId);
    if (!stream) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    res.status(200).json({ success: true, stream: stream });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) err = new IdNotFoundError();
    next(err); // pass error to error middleware
  }
};

/**
 * Create stream
 */
const create = async (req, res, next) => {
  try {
    const stream = await Stream.create({ ...req.body });
    res.status(201).json({ success: true, message: "Stream created" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) err.statusCode = 400;
    next(err); // pass error to error middleware
  }
};

/**
 * Delete stream from database
 */
const remove = async (req, res, next) => {
  try {
    const streamId = req.params.streamId;
    const stream = await Stream.findByIdAndDelete(streamId);
    if (!stream) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    res
      .status(200)
      .json({ success: true, message: `${stream.id} has been deleted` });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) err = new IdNotFoundError();
    next(err); // pass error to error middleware
  }
};

module.exports = {
  getAll,
  get,
  create,
  remove,
};
