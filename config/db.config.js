// Get the client
const dotenv = require('dotenv');

dotenv.config();

var mysql = require('mysql2/promise');

async function createDBConnection() {
    // Create the connection to database
    const dbConn = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    return dbConn;
}

module.exports = createDBConnection();