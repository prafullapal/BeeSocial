const express = require("express");
const userCtrl = require("../controllers/user.controller");
const authCtrl = require("../controllers/auth.controller");
const { authenticateUser } = require("../helpers/authentication");

const router = express.Router();

router.route("/list").get(userCtrl.list);

router
  .route("/:userId")
  .get(authenticateUser, userCtrl.read)
  .put(authenticateUser, userCtrl.update)
  .delete(authenticateUser, userCtrl.remove);

module.exports = router;
