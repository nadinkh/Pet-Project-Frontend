const jwt = require("jsonwebtoken");
const Ingridient = require("../models/Ingridient");
const WineType = require("../models/WineType");
const User = require("../models/User");

const SearchWine = (req, res) => {
  Ingridient.aggregate([
    {
      $match: {
        sub_type: {
          $in: [
            req.body.Meat,
            req.body.Preparation,
            req.body.Dairy,
            req.body.Vegetable,
            req.body.Herb,
            req.body.Starch,
            req.body.Sweet,
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        pairing: { $push: "$pairing" },
        perfect_pairing: { $push: "$perfect_pairing" },
      },
    },
    {
      $project: {
        _id: 0,
        pairing: {
          $reduce: {
            input: "$pairing",
            initialValue: { $arrayElemAt: ["$pairing", 0] },
            in: { $setIntersection: ["$$this", "$$value"] },
          },
        },
        perfect_pairing: {
          $reduce: {
            input: "$perfect_pairing",
            initialValue: { $arrayElemAt: ["$perfect_pairing", 0] },
            in: { $setUnion: ["$$this", "$$value"] },
          },
        },
      },
    },
    {
      $project: {
        pairing: 1,
        best: {
          $setIntersection: ["$pairing", "$perfect_pairing"],
        },
      },
    },
  ])
    .then((result) => {
      return res.json(result[0]);
    })
    .catch((err) => {
      return res.status(404).json("error");
    });
};

const SearchFood = (req, res) => {
  Ingridient.aggregate([
    {
      $match: { pairing: req.body.WineType },
    },
    {
      $group: { _id: "$type", sub_type: { $addToSet: "$sub_type" } },
    },
    {
      $project: {
        _id: 0,
        type: "$_id",
        sub_type: 1,
      },
    },
  ])
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      return res.status(404).json("error");
    });
};

module.exports = {
  SearchWine: SearchWine,
  SearchFood: SearchFood,
};
