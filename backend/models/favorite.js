const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  base: String,
  quote: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

favoriteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

favoriteSchema.index({ user: 1, base: 1, quote: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
