const User = require("../models/user.model");
var fs = require("fs");

const read = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.user.userId }).select(
      "-password -verificationToken -photo"
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

const photo = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.userId }).select("photo");
    if (!user || !user.photo) {
      return next({
        status: 401,
        message: "No Photo found",
      });
    }
    res.set("Content-Type", user.photo.contentType);
    res.status(200).send(user.photo.data);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
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

const remove = async (req, res, next) => {
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

const update = async (req, res, next) => {
  let { name, email, about } = req.body;
  try {
    let user = await User.findOneAndUpdate(
      { email: email },
      { name, about },
      {
        new: true,
      }
    );
    if (req.file) {
      user.photo.data = fs.readFileSync(req.file.path);
      user.photo.contentType = req.file.mimetype;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  read,
  photo,
  list,
  remove,
  update,
};
