const logsRouter = require("express").Router();
const Log = require("../models/log");
const User = require("../models/user");
const { tokenExtractor, userExtractor } = require("../utils/middleware");
const jwt = require("jsonwebtoken");

logsRouter.get("/", async (req, res) => {
  const logs = await Log.find({}).populate("user", { username: 1, name: 1 });
  res.json(logs);
});

logsRouter.get("/:id", async (req, res) => {
  const log = await Log.findById(req.params.id);
  if (log) {
    res.json(log);
  } else {
    res.status(404).end();
  }
});

logsRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: "User invalid",
    });
  }

  if (!body.base || !body.quote || !body.rate) {
    return res.status(400).json({
      error: "something missing",
    });
  }

  const log = new Log({
    base: body.base,
    quote: body.quote,
    rate: body.rate,
    amount: body.amount,
    date: body.date,
    user: user._id,
  });

  const savedLog = await log.save();
  user.logs = user.logs.concat(savedLog._id);
  await user.save();

  res.status(201).json(savedLog);
});

logsRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = request.user;
    const log = await Log.findById(request.params.id);
    if (log.user.toString() === user.id.toString()) {
      await Log.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "token invalid" });
    }
  },
);

module.exports = logsRouter;
