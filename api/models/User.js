const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const SALT_ROUNDS = 11;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  characters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Character"
    }
  ]
});

UserSchema.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});

UserSchema.methods.checkPassword = async function(plainTextPW) {
  return await bcrypt.compare(plainTextPW, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;