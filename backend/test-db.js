require("dotenv").config();
const { query } = require("./db/index");

async function testConnection() {
    try {
        const res = await query('SELECT NOW() AS current_time');
        console.log("Database connection successful!");
        console.log("Current Database Time:", res.rows[0].current_time);
        process.exit(0);
    } catch (err) {
        console.error("Database connection failed:");
        console.error(err);
        process.exit(1);
    }
}

testConnection();
