const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requestLogger = (req, res, next) => {
  logger.info("Method: ", req.method);
  logger.info("Path: ", req.path);
  logger.info("Body: ", req.body);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(401).json({ error: "user not found" });
  }

  req.user = user;
  next();
};

module.exports = { tokenExtractor, userExtractor, requestLogger };
