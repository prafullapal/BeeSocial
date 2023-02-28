const express = require("express");
const userCtrl = require("../controllers/user.controller");

const { authenticateUser } = require("../helpers/authentication");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.route("/list").get(userCtrl.list);

router
  .route("/:userId")
  .get(authenticateUser, userCtrl.read)
  .put(authenticateUser, upload.single("photo"), userCtrl.update)
  .delete(authenticateUser, userCtrl.remove);

router.route("/photo/:userId").get(userCtrl.photo);
module.exports = router;
