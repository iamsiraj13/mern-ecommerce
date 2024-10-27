const express = require("express");
const User = require("../models/user.model");
const data = require("../data");
const { seedData } = require("../controllers/seedController");
const seedRouter = express.Router();

seedRouter.get("/users", seedData);

module.exports = seedRouter;
