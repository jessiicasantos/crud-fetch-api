import mysql from 'mysql2/promise';
import 'dotenv/config';

export const dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// await dbConnection.connect(function(err) {
//     if(err) throw err;
//     console.log("Connected!");
// })