const User = require("../models/User");
const Character = require("../models/Character");
const { generateToken } = require("../utilities/auth");

const register = async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password
  });
  try {
    const createdUser = await newUser.save();
    const token = generateToken(createdUser.username, createdUser._id);
    res.json({ user: createdUser, token });
  } catch (err) {
    console.log("Caught a rejected promise: ", e);
    res.status(500).json({ err });
  }
};

const login = async (req, res) => {
  console.log("Trying to log in. Got this http request: ", req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    const success = await user.checkPassword(password);
    if (success) {
      res.status(200);
      const token = generateToken(username, user._id);
      res.json({ user, token });
    } else {
      res.status(422);
      res.json({ error: "Password or Username incorrect" });
    }
  } catch (err) {
    console.log("Caught a rejected promise: ", e);
    res.status(500).json({ err });
  }
};

const tokenLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const token = generateToken(user.username, req.userId);
    res.status(200).json({ user, token });
  } catch (err) {
    console.log("Caught a rejected promise: ", e);
    res.status(500).json({ err });
  }
};

const changePassword = async (req, res) => {
  const { username, password, newPassword } = req.body;
  try {
    const user = await User.findOne({ username });
    const success = await user.checkPassword(password);

    if (success) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ newPassword: user.password });
    } else {
      res.status(422).json({ msg: "Incorrect password provided." });
    }
  } catch (err) {
    console.log("Caught a rejected promise: ", e);
    res.status(500).json({ err });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    const promisesToDeleteCharacters = deletedUser.characters.map(
      async characterId => {
        return await Character.findByIdAndDelete(characterId);
      }
    );
    const deletedCharacters = await Promise.all(promisesToDeleteCharacters);
    res.json({ msg: "Successfully deleted User and all of their Characters." });
  } catch (err) {
    console.log("Caught a rejected promise: ", e);
    res.status(500).json({ err });
  }
};

module.exports = {
  register,
  login,
  tokenLogin,
  changePassword,
  deleteUser
};
