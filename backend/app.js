require("dotenv").config();
const express = require("express");
const cors = require("cors");
const transactionRouter = require("./rotues/transactions.route");

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// routes
app.use("/api/transactions", transactionRouter);

// global error handler
app.use((err, req, res, next) => {
  //   console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || "Server Error" });
});

module.exports = app;
