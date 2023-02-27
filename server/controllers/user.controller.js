const User = require("../models/user.model");

const read = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.userId }).select(
      "name email role isVerified verified"
    );
    if (!user) {
      return next({
        status: 401,
        message: "User not found",
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email role isVerified verified");
    if (!users) {
      return next({
        status: 401,
        message: "No Users found",
      });
    }
    res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res) => {
  try {
    let deletedUser = await User.findByIdAndRemove(req.user.userId);
    if (!deletedUser) {
      return next({
        status: 401,
        message: "User not found",
      });
    }
    deletedUser.password = undefined;
    deletedUser.verificationToken = undefined;
    res.status(200).json(deletedUser);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res) => {
  let user = req.body;
  console.log("Update: ", req.user, " with the following updates: ", user);
  res.status(200).json({ msg: "Functionality yet to be added." });
};

module.exports = {
  read,
  list,
  remove,
  update,
};
