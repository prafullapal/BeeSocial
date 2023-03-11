const express = require("express");
const userCtrl = require("../controllers/user.controller");

const { authenticateUser } = require("../helpers/authentication");

const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.route("/list").get(userCtrl.list);

router
  .route("/follow")
  .put(authenticateUser, userCtrl.addFollower, userCtrl.addFollowing );

router
  .route("/unfollow")
  .put(authenticateUser, userCtrl.removeFollower, userCtrl.removeFollowing);

router.route("/findPeople/:userId").get(authenticateUser, userCtrl.findPeople);

router
  .route("/:userId")
  .get(authenticateUser, userCtrl.read)
  .put(authenticateUser, upload.single("photo"), userCtrl.update)
  .delete(authenticateUser, userCtrl.remove);

router.route("/photo/:userId").get(userCtrl.photo);

module.exports = router;
