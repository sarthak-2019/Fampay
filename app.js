const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const serachRouter = require("./routes/searchRoutes");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Set Up Routers
app.use("/api", serachRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this Server!`, 404));
});

module.exports = app;
