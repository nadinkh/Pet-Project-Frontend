const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WineTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    wines: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = WineType = mongoose.model("Types", WineTypeSchema, "Types");
