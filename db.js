
import pg from "pg";
const { Pool } = pg;

//const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://render_datadb_user:8FF8zB0A1sUgPzDdd8oaKrANqn6SG7ry@dpg-d1qj21er433s73eepf9g-a.oregon-postgres.render.com/render_datadb",
    ssl:{
        rejectUnauthorized: false,
    },
});

export default pool;

/*
async function testConnection() {
    
    try {
    const client = await pool.connect();
    console.log("Successful conection!");
    client.release();
    await pool.end();
    } catch (err) {
    console.error("Error connecting to the database:", err);
    }
}

testConnection(); */

