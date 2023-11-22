const mongoose = require("mongoose");
const User = require("../models/user.model.js");

const get = (req, res, next) => {
  res.status(200).json({ message: "get" });
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
