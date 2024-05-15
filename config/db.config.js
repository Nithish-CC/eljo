// Get the client
var mysql = require('mysql2/promise');

async function createDBConnection() {
    // Create the connection to database
    const dbConn = await mysql.createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "root",
        database: "eljio_task",
    });
    
    return dbConn;
}

module.exports = createDBConnection();