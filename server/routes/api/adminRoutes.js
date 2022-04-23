const express = require("express");
const router = express.Router();
const adminAuth = require('../../middleware/adminAuthMiddleware')
const adminController = require("../../controller/adminController");

router.post("/add-hostel", adminAuth, adminController.addHostel);
router.post("/add-department", adminAuth, adminController.addDepartment);
router.post("/approve-user", adminAuth, adminController.approveUser);
router.post("/reject-user", adminAuth, adminController.rejectUser);

module.exports = router;