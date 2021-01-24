const express = require("express");
const router = express.Router();
const passport = require("passport");

const { SearchWine, SearchFood } = require("../controllers/winePairingCtrl");

router.get("/searchwine", SearchWine);
router.get("/searchfood", SearchFood);

module.exports = router;
