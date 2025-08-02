const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
mongoose.connection.once("open", () => {
  console.log("Mongo Connection ready");
});
mongoose.connection.on("error", (err) => {
  console.error(err.name, err.message);
  process.exit(1);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}
module.exports = mongoConnect;
