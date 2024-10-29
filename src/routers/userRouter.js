const express = require("express");
const {
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
