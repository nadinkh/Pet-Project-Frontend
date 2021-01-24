const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const IngridientSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    sub_type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pairing: {
      type: Array,
      required: true,
    },
    perfect_pairing: {
      type: Array,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = Ingridient = mongoose.model(
  "Ingridients",
  IngridientSchema,
  "Ingridients"
);
