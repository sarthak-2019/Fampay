const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const VideoCronJob = require("./jobs/videoCronJob");
// Catching uncaught Exceptions [by sync functions]
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exceptions! Shutting Down");
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config();
const DB = process.env.DATABASE;
// console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB CONNECTION SUCCESSFUL");
  });

// Starting the Server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on Port ${port}...`);
});

// VideoCronJob();

// Catching unhandled Rejections [by async functions]
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLER REJECTION! Shutting Down");
  server.close(() => {
    process.exit(1);
  });
});
