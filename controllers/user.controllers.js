const mongoose = require("mongoose");
const User = require("../models/user.model.js");
const { IdNotFoundError, NotAllowedError } = require("../errors/errors.js");

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

const create = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({ success: true, message: "User created" });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) err.statusCode = 400;
    next(err); // pass error to error middleware
  }
};

const update = (req, res, next) => {
  res.status(200).json({ message: "get" });
};

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

module.exports = {
  get,
  create,
  update,
  remove,
};
