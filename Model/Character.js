const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const informationUserSchema = new Schema(
  {
    "Starting Mana":{
      type : String,
    },
    Armor: {
      type: String,
    },

    "Atk Spd": {
      type: String,
    },

    Cost: {
      type: String,
    },
    "Crit Rate": {
      type: String,
    },
    DPS: {
      type: String,
    },
    Damage: {
      type: String,
    },
    Health: {
      type: String,
    },
    MR: {
      type: String,
    },
    Mana: {
      type: String,
    },
    Range: {
      type: String,
    },
  },
  { _id: false }
);

const CharacterSchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  class: {
    type: [String],
  },
  origin: {
    type: String,
  },
  items: {
    type: [String],
  },
  information: {
    type: informationUserSchema,
  },
});

module.exports = mongoose.model("Character", CharacterSchema);
