const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Character = mongoose.model("Character", CharacterSchema);
module.exports = Character;
