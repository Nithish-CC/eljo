const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee.controller');

//get all Discountfee
router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.delete('/:id', employeeController.deleteEmployeeById);

module.exports = router;