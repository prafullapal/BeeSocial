const Posts = require("../models/post.model");
const Users = require("../models/user.model");
var fs = require("fs");

const listNewsFeed = async (req, res, next) => {
  try {
    let following = await Users.findById(req.user.userId).select("following");
    following.following.push(req.user.userId);
    let posts = await Posts.find({
      postedBy: { $in: following.following },
    })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-createdAt")
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

const listByUser = async (req, res, next) => {
  try {
    let posts = await Posts.find({ postedBy: req.params.userId })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-createdAt")
      .exec();

    res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

const create = async (req, res, next) => {
  try {
    let post = new Posts({ text: req.body.text });
    post.postedBy = req.user.userId;
    if (req.file) {
      post.photo.data = fs.readFileSync(req.file.path);
      post.photo.contentType = req.file.mimetype;
    }
    let result = await post.save();
    let newPost = await Posts.findById(result._id)
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.status(200).json(newPost);
  } catch (err) {
    return next(err);
  }
};

const photo = async (req, res, next) => {
  try {
    let post = await Posts.findById(req.params.postId).select("photo");
    if (!post || !post.photo) {
      return next({
        status: 401,
        message: "No Photo found",
      });
    }
    res.set("Content-Type", post.photo.contentType);
    res.status(200).send(post.photo.data);
  } catch (err) {
    return next(err);
  }
};

const postById = async (req, res, next) => {
  try {
    let post = await Posts.findById(req.params.postId)
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const isPoster = async (req, res, next) => {
  try {
    let user = req.user.userId;
    let post = await Posts.findById(req.params.postId).select("postedBy");
    if (post.postedBy.toString() !== user) {
      return next({
        status: 403,
        message: "Unauthorized Operation Failed.",
      });
    }

    next();
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    let deletedPost = await Posts.findByIdAndRemove(req.params.postId);
    if (!deletedPost) {
      return next({
        status: 404,
        message: "Post not found.",
      });
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    return next(err);
  }
};

const like = async (req, res, next) => {
  try {
    let post = await Posts.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { likes: req.user.userId },
      },
      { new: true }
    )
      .populate("likes", "_id name")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const unlike = async (req, res, next) => {
  try {
    let post = await Posts.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { likes: req.user.userId },
      },
      { new: true }
    )
      .populate("likes", "_id name")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const comment = async (req, res, next) => {
  try {
    let commnt = { text: req.body.text, postedBy: req.user.userId };
    let post = await Posts.findByIdAndUpdate(
      req.params.postId,
      {
        $push: { comments: commnt },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

const uncomment = async (req, res, next) => {
  try {
    let comment = req.body;
    let post = await Posts.findByIdAndUpdate(
      req.params.postId,
      {
        $pull: { comments: { _id: comment._id } },
      },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  listNewsFeed,
  listByUser,
  create,
  photo,
  postById,
  isPoster,
  remove,
  like,
  unlike,
  comment,
  uncomment,
};
