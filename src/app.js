const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const app = express();

// middleware
const rateLimiter = rateLimit({
  windowsMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many reqest, Please try again letter",
});

app.use(cors());
app.use(xssClean());
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api end point

app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);
app.use("/", async (req, res) => {
  res.send("Hello");
});

// client error handling
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});
// server error handling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
