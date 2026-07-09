const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/usersRouter");
const logsRouter = require("./controllers/logsRouter");
const favoritesRouter = require("./controllers/favoritesRouter");
const loginRouter = require("./controllers/loginRouter");

const app = express();

logger.info("Connecting to: ", config.MONGODB);

mongoose
  .connect(config.MONGODB)
  .then(() => {
    logger.info("Connected to db");
  })
  .catch((error) => {
    logger.error("Error connecting to db: ", error.message);
  });

app.use(express.static("dist"));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
  }),
);
app.use(middleware.requestLogger);

app.use("/api/users", usersRouter);
app.use("/api/logs", logsRouter);
app.use("/api/favorites", favoritesRouter);
app.use("/api/login", loginRouter);

module.exports = app;
