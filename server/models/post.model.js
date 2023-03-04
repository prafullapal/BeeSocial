const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
  ],
  comments: [
    {
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
      postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
    },
  ],
});

module.exports = mongoose.model("Posts", PostSchema);
