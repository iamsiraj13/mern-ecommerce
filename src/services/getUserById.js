const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const getUserById = async (id) => {
  try {
    const options = { password: 0 };
    const user = await User.findById(id, options);

    if (!user) throw createError(404, "User doesn't exist");
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "Invalid user Id");
    }

    throw error;
  }
};

module.exports = getUserById;
