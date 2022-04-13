const express = require("express");
const router = express.Router();
const studentAuthController = require("../../controller/studentAuthController");

router.post("/student-login",studentAuthController.studentLogin);
router.post("/student-reg",studentAuthController.studentRegister);
router.post("/student-create-profile",studentAuthController.studentCreateProfile);

module.exports = router;