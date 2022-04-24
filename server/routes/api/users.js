
const express = require("express");
const router = express.Router();
const userController = require("../../controller/userController");
const adminAuth = require('../../middleware/adminAuthMiddleware')
const systemAdminAuth = require("../../middleware/systemAdminAuth");


router.get("/get-students-hostels/:id", adminAuth, userController.getStudentByHostels);
router.get("/get-students-departments/:id", adminAuth, userController.getStudentsByDepartments);
router.get("/get-students/", systemAdminAuth, userController.getAllStudents);

module.exports = router;