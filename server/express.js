const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
const router = require("./routes");

const {
  handle_custom_error,
  page_not_found_error,
} = require("./helpers/errorHandler");

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(compress());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

// app.use(express.static(path.join(__dirname, "..", "dist")));

// mount routes
app.use("/", router);

// 404 and other custom error handler
app.use(handle_custom_error);
app.use(page_not_found_error);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
// });

// Catch unauthorised errors
// app.use((err, req, res, next) => {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).json({ error: err.name + ": " + err.message });
//   } else if (err) {
//     res.status(400).json({ error: err.name + ": " + err.message });
//     console.log(err);
//   }
// });

module.exports = app;
