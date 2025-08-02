const http = require("http");
const app = require("./app");
require("dotenv").config();
const mongoConnect = require("./db/db");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}

startServer();
