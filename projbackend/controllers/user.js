const User = require("../models/user");

exports.getAllUser = (req, res) => {
  User.find().exec((err, users) => {
    if(err) {
      return res.status(400).json({
        error: "No user found."
      })
    }
    res.json(users)
  })
};
