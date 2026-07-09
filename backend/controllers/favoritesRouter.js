const favoritesRouter = require("express").Router();
const Favorite = require("../models/favorite");
const User = require("../models/user");
const { tokenExtractor, userExtractor } = require("../utils/middleware");
const jwt = require("jsonwebtoken");

favoritesRouter.get("/", async (req, res) => {
  const favorites = await Favorite.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(favorites);
});

favoritesRouter.get("/:id", async (req, res) => {
  const favorite = await Favorite.findById(req.params.id);
  if (favorite) {
    res.json(favorite);
  } else {
    res.status(404).end();
  }
});

favoritesRouter.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  console.log("Stuff: ", decodedToken, req, res);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error: "User invalid",
    });
  }

  if (!body.base || !body.quote) {
    return res.status(400).json({
      error: "something missing",
    });
  }

  const favorite = new Favorite({
    base: body.base,
    quote: body.quote,
    user: user._id,
  });

  const savedFavorite = await favorite.save();
  user.favorites = user.favorites.concat(savedFavorite._id);
  await user.save();

  res.status(201).json(savedFavorite);
});

favoritesRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = request.user;
    const favorite = await Favorite.findById(request.params.id);
    if (favorite.user.toString() === user.id.toString()) {
      await Favorite.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: "token invalid" });
    }
  },
);

module.exports = favoritesRouter;
