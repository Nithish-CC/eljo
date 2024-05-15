const { GetDepartmentRepository } = require("../repository/department.repository");


exports.getDepartments = (req, res) => {
    GetDepartmentRepository((isSuccess,Department) => {
        if (Department) {
            res.status(200).send({
                message: Department,
                success: isSuccess
            });
        } else {
            res.status(500).send({
                message: "Failed to get department list !",
                success: isSuccess
            });
        }
    })
}