const express = require('express');
const router = express.Router();

const EmployeeProfileController = require('../controllers/profile.controller');

//get all Discountfee
router.get('/', EmployeeProfileController.EmployeeProfile);

router.put('/', EmployeeProfileController.UpdateEmployeeProfile);

module.exports = router;