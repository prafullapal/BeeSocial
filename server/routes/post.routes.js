const express = require("express");
const { authenticateUser } = require("../helpers/authentication");

const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

const postCtrl = require("../controllers/post.controller");

router.route("/feed/:userId").get(authenticateUser, postCtrl.listNewsFeed);

router.route("/by/:userId").get(authenticateUser, postCtrl.listByUser);

router
  .route("/new/:userId")
  .post(authenticateUser, upload.single("photo"), postCtrl.create);

router.route("/photo/:postId").get(authenticateUser, postCtrl.photo);

router
  .route("/:postId")
  .get(authenticateUser, postCtrl.postById)
  .delete(authenticateUser, postCtrl.isPoster, postCtrl.remove);

router.route("/like/:postId").get(authenticateUser, postCtrl.like);
router.route("/unlike/:postId").get(authenticateUser, postCtrl.unlike);

router.route("/comment/:postId").put(authenticateUser, postCtrl.comment);
router.route("/uncomment/:postId").put(authenticateUser, postCtrl.uncomment);

module.exports = router;
