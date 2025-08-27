require("dotenv").config();
const http = require("http");
const app = require("./app");
// define varibles
const PORT = process.env.PORT || 8000;

//create http server
const server = http.createServer(app);

//  listening the server
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
