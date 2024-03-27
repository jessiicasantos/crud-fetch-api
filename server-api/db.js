import mysql from "mysql";
import 'dotenv/config';

export const dbConnection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
});

dbConnection.connect(function(err) {
    if(err) throw err;
    console.log("Connected!");
})