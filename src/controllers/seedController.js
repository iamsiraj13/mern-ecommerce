const data = require("../data");
const User = require("../models/user.model");

const seedData = async (req, res) => {
  try {
    // deleting all existing users
    await User.deleteMany({});

    // inserting new users
    const users = await User.insertMany(data.users);

    // successful response
    res.status(201).json(users);
  } catch (error) {
    console.error("Error seeding users:", error);
    res.status(500).json({ message: "Failed to seed users" });
  }
};

module.exports = { seedData };
