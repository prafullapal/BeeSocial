const User = require("../models/user.model");
var fs = require("fs");

const read = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.userId })
      .select("-password -verificationToken -photo")
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
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
    let users = await User.find().select(
      "name email role photo isVerified verified"
    );
    if (!users) {
      return next({
        status: 401,
        message: "No Users found",
      });
    }
    res.status(200).send(users);
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
    console.log("here");
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const addFollowing = async (req, res, next) => {
  try {
    if (req.body.followId) {
      let user = await User.findByIdAndUpdate(req.user.userId, {
        $push: { following: req.body.followId },
      });
    } else {
      return next({
        status: 404,
        message: "No such user found",
      });
    }
    next();
  } catch (err) {
    return next(err);
  }
};

const addFollower = async (req, res, next) => {
  try {
    if (req.body.followId) {
      let result = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { followers: req.user.userId },
        },
        { new: true }
      )
        .select("-password -verificationToken -photo")
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec();
      res.status(200).json(result);
    } else {
      return next({
        status: 404,
        message: "No such user found",
      });
    }
  } catch (err) {
    return next(err);
  }
};

const removeFollowing = async (req, res, next) => {
  try {
    if (req.body.unfollowId) {
      let user = await User.findByIdAndUpdate(req.user.userId, {
        $pull: { following: req.body.unfollowId },
      });
    } else {
      return next({
        status: 404,
        message: "No such user found",
      });
    }
    next();
  } catch (err) {
    return next(err);
  }
};

const removeFollower = async (req, res, next) => {
  try {
    if (req.body.unfollowId) {
      let result = await User.findByIdAndUpdate(
        req.body.unfollowId,
        {
          $pull: { followers: req.user.userId },
        },
        { new: true }
      )
        .select("-password -verificationToken -photo")
        .populate("following", "_id name")
        .populate("followers", "_id name")
        .exec();
      res.status(200).json(result);
    } else {
      return next({
        status: 404,
        message: "No such user found",
      });
    }
  } catch (err) {
    return next(err);
  }
};

const findPeople = async (req, res) => {
  let following = req.user.following || [];
  following.push(req.user.userId);
  try {
    let users = await User.find({ _id: { $nin: following } }).select("name");
    res.status(200).json(users);
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
  addFollowing,
  addFollower,
  removeFollowing,
  removeFollower,
  findPeople,
};
