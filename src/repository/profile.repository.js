const dbConnPromise = require("../../config/db.config");

const EmployeeProfileRepository = async ({ result }, resultData) => {
    try {
        const dbConn = await dbConnPromise;
        const [results, fields] = await dbConn.query("SELECT e.*, d.name AS department_name FROM employee e INNER JOIN department d ON e.department_id = d.id WHERE e.id = ?",
            [result.id]);
        if (Array.isArray(results) && results.length) {
            delete results[0].password;
        }
        resultData(results)
    } catch (err) {
        resultData(err)
    }
};

const UpdateEmployeeProfileRepository = async (id, employeeData, result) => {
    if (id && employeeData && typeof employeeData === 'object') {
        try {
            const dbConn = await dbConnPromise;
            const [results] = await dbConn.query("UPDATE employee SET ? WHERE id = ?", [employeeData, id]);
            if (results.affectedRows > 0) {
                result(true, `Employee with id ${id} updated successfully.`);
            } else {
                result(false, `No employee found with id ${id}.`);
            }
        } catch (err) {
            result(false, err);
        }
    } else {
        result(false, "Invalid employee ID or data provided.");
    }
};


module.exports = {
    EmployeeProfileRepository,
    UpdateEmployeeProfileRepository
};
