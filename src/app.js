const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db.js");
const routes = require("./routes/index.js");
const { errorLogger, errorResponder } = require("./errors/middleware.js");
const { InvalidPathError } = require("./errors/errors.js");
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/", routes);
app.use("*", (req, res, next) => {
  throw new InvalidPathError();
});

app.use(errorLogger);
app.use(errorResponder);

module.exports = app;
