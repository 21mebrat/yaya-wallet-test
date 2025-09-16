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
// get  transactions router
transactionRouter.get("/get", getTransactions);
//searh transactions router
transactionRouter.post("/search", searchTransaction);
// export the router
module.exports = transactionRouter;
