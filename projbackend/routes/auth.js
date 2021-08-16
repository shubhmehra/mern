var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, login } = require("../controllers/auth");
const { getUser } = require("../controllers/user");

router.post(
  "/signup",
  [
    check("name", "Name should be at least 3 charchter long").isLength({
      min: 3,
    }),
    check("email", "email is required").isEmail(),
    check("password", "Password should be at least 3 charchter long").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "Password is required").isLength({
      min: 1,
    }),
  ],
  login
);

router.get("/signout", signout);

module.exports = router;
