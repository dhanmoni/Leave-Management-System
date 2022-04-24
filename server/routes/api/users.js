
const express = require("express");
const router = express.Router();
const auth = require('../../middleware/authMiddleware')
const adminAuth = require('../../middleware/adminAuthMiddleware')
const userController = require("../../controller/userController");


router.get("/get-students-hostels/:id", adminAuth, userController.getStudentByHostels);
router.get("/get-students-departments/:id", adminAuth, userController.getStudentsByDepartments);

module.exports = router;