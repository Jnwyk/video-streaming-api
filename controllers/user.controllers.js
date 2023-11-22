const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const Stream = require("../models/stream.model.js");
const {
  IdNotFoundError,
  NotAllowedError,
  IncorrectInputData,
} = require("../errors/errors.js");

/**
 * Retrieve specified user from the database
 */
const get = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    if (user.streams.length > 3) {
      throw new NotAllowedError(user.id); // throw an error, if is watching more than 3 streams
    }
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) err = new IdNotFoundError(); // if mongoose throws an error change to IdNotFoundError
    next(err); // pass error to error middleware
  }
};

/**
 * Create a user
 */
const create = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) err.statusCode = 400;
    next(err); // pass error to error middleware
  }
};

/**
 * Delete a user
 */
const remove = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    res
      .status(200)
      .json({ success: true, message: `${user.id} has been deleted` });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) err = new IdNotFoundError();
    next(err); // pass error to error middleware
  }
};

/**
 * Add or remove stream that user is watching
 */
const updateStreams = async (req, res, next) => {
  try {
    const actionType = req.query.type; // type of action (delete or add)
    const userId = req.params.userId;
    const streamId = req.body.streamId;
    const user = await User.findById(userId);
    if (!user) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    if (actionType === "delete") {
      user.streams = user.streams.filter(
        (stream) => stream.toString() !== streamId
      ); // update user streams without deleted stream
    } else if (actionType === "add") {
      user.streams = [...user.streams, streamId]; //update user streams with added stream
      if (user.streams.length > 3) {
        throw new NotAllowedError(); // throw an error, if user is watching more than 3 streams
      }
    } else {
      throw new IncorrectInputData(); // throw an error, if wrong query string
    }
    await user.save();
    res.status(200).json({ success: true, message: "Operation successfull" });
  } catch (err) {
    next(err);
  }
};

/**
 * Retrieve streams that user is watching from the database
 */
const getStreams = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new IdNotFoundError(); // throw an error, if stream doesn't exist
    }
    const streams = await Promise.all(
      user.streams.map((streamId) => Stream.findById(streamId))
    );
    if (streams.length > 3) {
      throw new NotAllowedError(); // throw an error, if user is watching more than 3 streams
    }
    res.status(200).json({ success: true, streams: streams });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  get,
  create,
  remove,
  updateStreams,
  getStreams,
};
