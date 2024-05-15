const { createEmployeeRepository, getEmployeeRepository, deleteEmployeeByIdRepository, getEmployeeByIdRepository } = require("../repository/employee.repository");
const { generatePassword } = require("../utils/passwordGenerator");
const { EmployeeSignupSchema } = require("../validators");

const getEmployeeDetails = (employee) => {
    const EmployeeReqData = {
        first_name: employee.firstName,
        last_name: employee.lastName,
        email: employee.email,
        contact_number: employee.contactNumber,
        department_id: employee.departmentId,
        password: generatePassword(),
        created_at: new Date(),
        updated_at: new Date(),
        role: 'employee'
    };
    return EmployeeReqData
}

exports.createEmployee = (req, res) => {
    const { error } = EmployeeSignupSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return res.send("Invalid Request: " + JSON.stringify(error));
    } else {
        const employee = getEmployeeDetails(req.body);
        createEmployeeRepository(employee, (isSuccess, message) => {
            if (isSuccess) {
                res.status(200).send({
                    message: "Employee created successfully !",
                    success: isSuccess
                });
            } else {
                res.status(500).send({
                    message: message,
                    success: isSuccess
                });
            }
        });
    }
};

exports.getEmployees = (req, res) => {
    const { departmentId } = req.query;
    getEmployeeRepository(departmentId, (isSuccess, Employee) => {
        if (isSuccess) {
            res.status(200).send({
                message: Employee.map((values) => {
                    delete values.password;
                    return values;
                }),
                success: isSuccess
            });
        } else {
            res.status(500).send({
                message: "Failed to get employee list !",
                success: isSuccess
            });
        }
    })
}

exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    getEmployeeByIdRepository(id, (Success, Employee) => {
        if (Success) {
            res.status(200).send({
                message: Employee.map((values) => {
                    delete values.password;
                    return values;
                }),
                success: true
            });
        } else {
            res.status(500).send({
                message: "Failed to get employee list !",
                success: false
            });
        }
    })
}

exports.deleteEmployeeById = (req, res) => {
    const { id } = req.params;
    deleteEmployeeByIdRepository(id, (Success, Employee) => {
        if (Success) {
            res.status(200).send({
                message: Employee,
                success: true
            });
        } else {
            res.status(500).send({
                message: "Failed to get employee list !",
                success: false
            });
        }
    })
}