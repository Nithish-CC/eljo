var dbConnPromise = require("../../config/db.config");

module.exports = {
    getLoginModule: async (email, callBack) => {
        try {
            // Wait for the database connection to be established
            const dbConn = await dbConnPromise;
            // Perform the database operation
            const [results,fields] = await dbConn.query("SELECT * FROM employee where email =? ", [email]);
            callBack(true,results);
        } catch (err) {
            callBack(false,err);
        }
    }
}