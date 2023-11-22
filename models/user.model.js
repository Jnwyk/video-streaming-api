const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * validate if email string is okay
 */
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    username: { type: String, required: [true, "Username is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validateEmail, "Wrong email address"],
      unique: true,
    },
    streams: {
      type: mongoose.ObjectId,
      ref: "Stream",
      max: [3, "There can't be more than 3 streams attatched to a user"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
