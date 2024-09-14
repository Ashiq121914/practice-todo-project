// basic library import
const express = require("express");
const router = require("./src/routes/api.js");
const app = new express();
const bodyParser = require("body-parser");

// security middleware library import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// database library import
const mongoose = require("mongoose");

// security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// body parser implement
app.use(bodyParser.json());

// request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// mongoDb database connection
let uri = "mongodb://localhost:27017/Todo";
let option = { user: "", pass: "", autoIndex: true };
mongoose
  .connect(uri, option)
  .then(() => {
    console.log("database connection success");
  })
  .catch((err) => {
    console.log("database connection failed", err);
  });

// routing implement
app.use("/api/v1", router);

// undefined route
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "not found" });
});

module.exports = app;
