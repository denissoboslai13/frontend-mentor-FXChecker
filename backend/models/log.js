const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  base: String,
  quote: String,
  rate: {
    type: mongoose.Schema.Types.Decimal128,
  },
  amount: String,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

logSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

logSchema.index({ user: 1, base: 1, quote: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Log", logSchema);
