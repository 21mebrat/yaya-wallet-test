const crypto = require("crypto");

const generateYayaSignature = (
  secret,
  method,
  endpoint,
  body = "",
  timestamp
) => {
  const bodyString = typeof body === "object" ? JSON.stringify(body) : body;
  const preHash = `${timestamp}${method.toUpperCase()}${endpoint}${bodyString}`;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(preHash);
  const hash = hmac.digest();
  return hash.toString("base64");
};

module.exports = generateYayaSignature;
