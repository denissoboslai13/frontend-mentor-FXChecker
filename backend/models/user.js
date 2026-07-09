const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 50,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
  logs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
