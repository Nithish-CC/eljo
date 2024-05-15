
const dbConnPromise = require("../../config/db.config");
const GetDepartmentRepository = async (result) => {
    try {
        const dbConn = await dbConnPromise;
        let query = "SELECT d.* FROM department d";
        const [results] = await dbConn.query(query);
        result(true,results)
    } catch (err) {
        result(false,err)
    }
};

module.exports = {
    GetDepartmentRepository,
};