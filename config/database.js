const { createPool } = require("mysql2");
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://ratheedevanshu:billiejean@devanshusample.dpwrw9f.mongodb.net/'; // Replace with your MongoDB connection string
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const pool = createPool({
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "admin1234",
    database: process.env.MYSQL_DB || "test",
    connectionLimit: 10,
});

function executeSelectQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.execute(sql, function (err, result) {
            if (err) {
                console.error("MySQL Error executing SELECT query:", err);
                reject(err);
                return;
            }

            const jsonResult = JSON.parse(JSON.stringify(result));
            console.log("MySQL Query result:", jsonResult);
            resolve(jsonResult);
        });
    });
}

function executeInsertQuery(sql, values) {
    return new Promise((resolve, reject) => {
        pool.execute(sql, values, function (err, result) {
            if (err) {
                console.error("MySQL Error executing INSERT query:", err);
                reject(err);
                return;
            }

            const jsonResult = JSON.parse(JSON.stringify(result));
            console.log("MySQL Query result:", jsonResult);
            resolve(jsonResult);
        });
    });
}

module.exports = {
    executeSelectQuery,
    executeInsertQuery
};
