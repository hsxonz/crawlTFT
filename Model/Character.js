const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  Name: {
    type: String,
  },
  Icon: {
    type: String,
  },
  Cost: {
    type: String,
  },
  Health: {
    type: String,
  },
  Mana: {
    type: String,
  },
  "Starting Mana": {
    type: String,
  },
  Armor: {
    type: String,
  },
  MR: {
    type: String,
  },
  DPS: {
    type: String,
  },
  Damage: {
    type: String,
  },
  "Crit Rate": {
    type: String,
  },
  Range: {
    type: String,
  },
});

module.exports = mongoose.model("Character", CharacterSchema);
