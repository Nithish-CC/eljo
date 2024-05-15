const { getLoginModule } = require("../repository/login.repository");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

exports.login = (req, res) => {
    const body = req.body;
    getLoginModule(body.email, (isSuccess,results) => {
        if (!results.length) {
            return res.status(400).json({
                success: 0,
                data: "Invaild email or password",
            });
        }
        const employeeProfile = results[0];
        let enteredPassword = employeeProfile.password;
        if (body?.password === enteredPassword) {
            delete employeeProfile.password;
            const jsontoken = sign({ result: employeeProfile }, "qwe1234", {
                expiresIn: "24h",
            });
            return res.status(200).json({
                success: true,
                message: "Login successfully",
                token: jsontoken,
                role:employeeProfile.role
            });
        } else {
            return res.status(400).json({
                success: false,
                data: "Invaild email or password",
            });
        }
    });
};
