const express = require("express");
const router = express.Router();
const studentAuthController = require("../../controller/studentAuthController");

router.post("/auth-student",studentAuthController.studentAuth);
router.post("/student-reg",studentAuthController.createStudent);
router.post("/student-create-profile",studentAuthController.createStudentProfile);
router.get("/get-student/:publicKey",studentAuthController.getStudentByPublicKey);


module.exports = router;