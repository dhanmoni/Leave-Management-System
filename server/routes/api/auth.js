const express = require("express");
const router = express.Router();
const authController = require("../../controller/authController");

router.post("/",authController.userAuth);
router.post("/register",authController.createUser);
router.post("/create-profile",authController.createUserProfile);
router.get("/get-user/:publicKey",authController.getUserByPublicKey);


module.exports = router;