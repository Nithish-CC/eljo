const { EmployeeProfileRepository, UpdateEmployeeProfileRepository } = require("../repository/profile.repository");
const { jwtDecode } = require("jwt-decode");
const { EmployeeUpdateSchema } = require("../validators");


const EditProfileDetails = (employee) => {
    const EmployeeReqData = {
        first_name: employee.firstName,
        last_name: employee.lastName,
        email: employee.email,
        contact_number: employee.contactNumber,
        department_id: employee.departmentId,
        profile_image: employee.profileImage,
        updated_at: new Date(),
        role: 'employee'
    };
    return EmployeeReqData
}


exports.EmployeeProfile = (req, res) => {
    const token = req.header('authorization');
    const extractToken = token.replace("Bearer ")
    const decoded = jwtDecode(extractToken);
    EmployeeProfileRepository(decoded, (Employee) => {
        if (Employee) {
            res.status(200).send({
                message: Employee.map((values) => {
                    delete values.password;
                    return values;
                }),
                success: true
            });
        } else {
            res.status(500).send({
                message: "Failed to find employee !",
                success: false
            });
        }
    });
};

exports.UpdateEmployeeProfile = (req, res) => {
    const { error } = EmployeeUpdateSchema.validate(req.body, {
        abortEarly: false,
    });
    if (error) {
        return res.send("Invalid Request: " + JSON.stringify(error));
    } else {
        const data = EditProfileDetails(req.body);
        UpdateEmployeeProfileRepository(req.body?.id, data, (isSuccess, message) => {
            if (isSuccess) {
                res.status(200).send({
                    message: message,
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