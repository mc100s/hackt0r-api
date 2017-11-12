var express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
const Actor = require("../models/actor");

var router = express.Router();

// Get all actors
router.get("/actors", (req, res) => {
  Actor.find({}, { _id: 0, name: 1, pictureUrl: 1, tmdbPopularity: 1 }).then(actors => {
    res.json({
      actors: actors
    });
  })
});

module.exports = router;
