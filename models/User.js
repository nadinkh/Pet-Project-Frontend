const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    likedWines: {
      type: Array,
      required: false,
    },
  },
  { versionKey: false }
);

module.exports = User = mongoose.model("Users", UserSchema, "Users");
