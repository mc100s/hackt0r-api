var express = require('express');
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");
var router = express.Router();

router.get("/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({
      message: "You're not connected"
    });
  }
});


// This is an example of protected route
// If the user is not authenticated, he'll be get a 404
// This allows us to keep our routes secret
router.get(
  "/secret",
  // this is protecting the route and giving us access to
  // req.user
  ensureLoggedIn(),
  (req, res) => {
    // send the user his own information
    res.json(req.user);
  }
);

// This route is only accessible for non authenticated users
// If the user is not authenticated, he will be redirected to /
router.get(
  "/not-secret",
  // this is protecting the route and giving us access to
  // req.user
  ensureLoggedOut(),
  (req, res) => {
    // send the user his own information
    res.json({ message: "Go ahead" });
  }
);

module.exports = router;
