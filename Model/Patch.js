const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charactersUpdateSchema = new Schema({});
const PatchSchema = new Schema({
  name: {
    type: String,
  },
  itemsUpdate: { type: [String] },
  traitsUpdate: { type: [String] },
  charactersUpdate: { type: [String] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Patch", PatchSchema, "Patch");
