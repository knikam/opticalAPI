const mysql = require("mysql");
const databaseConfig = require("../Configuration/database.config");

const connection = mysql.createConnection({
    host : databaseConfig.HOST,
    user : databaseConfig.USER,
    password : databaseConfig.PASSWORD,
    database : databaseConfig.DB
});

connection.connect(error=>{
    if(error) throw error;
    console.log("database Connected....");
});

module.exports = connection;