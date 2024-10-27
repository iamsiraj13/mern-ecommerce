const createError = require("http-errors");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");

// get all user
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = {
      password: 0,
    };
    const count = await User.find(filter).countDocuments();
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    if (!users) throw createError(404, "no users found");

    res.status(200).json({
      message: "Users ware returned",
      users,
      pagination: {
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextpage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const options = { password: 0 };
    const user = await User.findById(id, options);

    if (!user) throw createError(404, "User doesn't exist");

    res.status(200).json({
      message: "Users ware returned",
      user,
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
};
