const dbConnPromise = require("../../config/db.config");
const { sendWelcomeEmail } = require("../utils/mailer");

const createEmployeeRepository = async (employeeData, result) => {
    try {
        const dbConn = await dbConnPromise;

        // Check if email already exists
        const emailExistsQuery = "SELECT * FROM employee WHERE email = ?";
        const [emailExists] = await dbConn.query(emailExistsQuery, [employeeData.email]);
        if (emailExists.length > 0) {
            return result(false, "Email already exists");
        }

        // Check if phone number already exists
        const phoneExistsQuery = "SELECT * FROM employee WHERE contact_number = ?";
        const [phoneExists] = await dbConn.query(phoneExistsQuery, [employeeData.contact_number]);
        if (phoneExists.length > 0) {
            return result(false, "Phone number already exists");
        }

        // If email and phone are unique, proceed with insertion
        const [results, fields] = await dbConn.query("INSERT INTO employee SET ?", employeeData);
        const newId = results.insertId;
        if (newId >= 1) {
            const eljoId = `eljo_${newId}`;
            await dbConn.query("UPDATE employee SET employee_code = ? WHERE id = ?", [eljoId, newId]);
            sendWelcomeEmail(employeeData);
            result(true, results);
        }
    } catch (err) {
        result(false, err);
    }
};



const getEmployeeRepository = async (departmentId = 'all', result) => {
    try {
        const dbConn = await dbConnPromise;
        let query = `
            SELECT e.*, d.name AS department_name 
            FROM employee e 
            INNER JOIN department d ON e.department_id = d.id
            WHERE e.role = 'employee'
        `;
        let params = [];

        if (departmentId !== "all") {
            query += " AND e.department_id = ?";
            params.push(departmentId);
        }

        query += " ORDER BY e.id";
        const [results] = await dbConn.query(query, params);
        result(true,results)
    } catch (err) {
        result(false,err)
    }
};



const getEmployeeByIdRepository = async (employeeId = '', result) => {
    if (employeeId !== '' && employeeId !== undefined) {
        try {
            const dbConn = await dbConnPromise;
            let query = "SELECT e.*, d.name AS department_name FROM employee e INNER JOIN department d ON e.department_id = d.id";
            let params = [];
            query += " WHERE e.id = ? AND e.role = 'employee'";
            params.push(employeeId);
            const [results] = await dbConn.query(query, params);
            result(true, results);
        } catch (err) {
            result(false, err);
        }
    } else {
        result(false, "Failed to get employee data !")
    }
};

const deleteEmployeeByIdRepository = async (employeeId = '', result) => {
    if (employeeId !== '' && employeeId !== undefined) {
        try {
            const dbConn = await dbConnPromise;
            let query = "DELETE FROM employee WHERE id = ? AND e.role = 'employee'";
            let params = [employeeId];
            const [results] = await dbConn.query(query, params);
            if (results.affectedRows > 0) {
                result(true, `Employee with id ${employeeId} deleted successfully.`);
            } else {
                result(false, `No employee found with id ${employeeId}.`);
            }
        } catch (err) {
            result(false, err);
        }
    } else {
        result(false, "Failed to delete employee data!");
    }
};


module.exports = {
    createEmployeeRepository,
    getEmployeeRepository,
    getEmployeeByIdRepository,
    deleteEmployeeByIdRepository
};
