const express = require("express");
const {
  getTransactions,
  searchTransaction,
} = require("../controllers/transactions.controllers");
// define express router
const transactionRouter = express.Router();

const API_KEY = process.env.YAYA_API_KEY;
const API_SECRET = process.env.YAYA_API_SECRET;
const BASE_URL = "https://yayawallet.com/api/en/transaction";

transactionRouter.get("/get", getTransactions);

// POST /api/transactions/search
transactionRouter.post("/search", searchTransaction);

module.exports = transactionRouter;
