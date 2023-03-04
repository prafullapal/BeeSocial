const config = require("./../config/config");
const app = require("./express");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error: ")
);
mongoose.connection.once("open", function () {
  console.log("Connected successfully");
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
