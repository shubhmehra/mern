const faker = require("faker");
const User = require("./user");

const seedUser = async () => {
  try {
    const users = [];
    for (let u = 0; u < 50; u++) {
      users.push(
        new User({
          name: faker.name.firstName(),
          lastname: faker.name.lastName(),
          email: faker.internet.email(),
          encry_password: faker.internet.password(),
        })
      );
    }

    users.forEach((user) => {
      User.create(user)
        .then((user) => {
          console.log(user);
        })
        .catch((err) => console.log(err));
    });
    console.log(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedUser