const { default: axios } = require("axios");
const generateYayaSignature = require("../utils/signRequest");

// variables
const API_KEY = process.env.YAYA_API_KEY;
const API_SECRET = process.env.YAYA_API_SECRET;
const BASE_URL = "https://sandbox.yayawallet.com/api/en/transaction";

// get paginated transactions
const getTransactions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.p, 10) || 1;
    const endpoint = `/api/en/transaction/find-by-user`;
    const timestamp = Date.now().toString();
    const body = "";

    const signature = generateYayaSignature(
      API_SECRET,
      "GET",
      endpoint,
      body,
      timestamp
    );

    const response = await axios.get(`${BASE_URL}/find-by-user`, {
      params: { p: page },
      headers: {
        "Content-Type": "application/json",
        "YAYA-API-KEY": API_KEY,
        "YAYA-API-TIMESTAMP": timestamp,
        "YAYA-API-SIGN": signature,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// search transactions
const searchTransaction = async (req, res, next) => {
  try {
    const { query } = req.body;
    const endpoint = `/api/en/transaction/search`;
    const timestamp = Date.now().toString();
    const body = { query };

    const signature = generateYayaSignature(
      API_SECRET,
      "POST",
      endpoint,
      body,
      timestamp
    );

    const response = await axios.post(`${BASE_URL}/search`, body, {
      headers: {
        "Content-Type": "application/json",
        "YAYA-API-KEY": API_KEY,
        "YAYA-API-TIMESTAMP": timestamp,
        "YAYA-API-SIGN": signature,
      },
    });

    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTransactions,
  searchTransaction,
};
