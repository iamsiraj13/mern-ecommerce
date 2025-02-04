const createError = require("http-errors");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");
const getWithId = require("../services/getWithId");
const fs = require("fs").promises;
const { default_user_image_path } = require("../secret");
const deleteImage = require("../helper/deleteImage");
const { successResponse } = require("./response.controller.js");

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

    return successResponse(res, {
      statusCode: 200,
      message: "User ware returned",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          prevPage: page - 1 > 0 ? page - 1 : null,
          nextpage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
    // res.status(200).json({
    //   message: "Users ware returned",
    //   users,
    //   pagination: {
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page,
    //     prevPage: page - 1 > 0 ? page - 1 : null,
    //     nextpage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
    //   },
    // });
  } catch (error) {
    next(error);
  }
};

// get user by id
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const options = { password: 0 };
    const user = await getWithId(User, id, options);
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
// delete user
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getWithId(User, id);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    // delete user
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    res.status(200).json({
      message: "User delete successfull",
    });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      next(createError(404, "Invalid user Id"));
      return;
    }
    next(error);
  }
};

// register user
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    res.status(200).json({
      message: "User delete successfull",
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
  deleteUser,
  register,
};
