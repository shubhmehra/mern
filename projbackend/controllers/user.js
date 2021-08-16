const User = require("../models/user");

exports.getUser = (req, res) => {
  User.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap.push({user});
    });
	console.log(userMap);
    res.send(JSON.stringify(userMap));
  });
};
