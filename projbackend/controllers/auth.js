const User = require("../models/user");
const { validationResult, check } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      console.log(error);
      if (error && error.code === 11000) {
        return res.status(400).json({
          error: "Duplicate email in Database.",
        });
      }
      return res.status(400).json({
        error: "Not able to save user in Database.",
      });
    }
    res.json({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
    });
  });
};

exports.login = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exist.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put inside cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //response to front
    const { _id, name, lastname, email } = user;

    return res.json({ token, user: { _id, name, lastname, email } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully!",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});
