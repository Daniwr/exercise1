
import pg from "pg";
const { Pool } = pg;

//const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://root:4EfHv3fuoHuxmXzBw39fGyudMDocgKRq@dpg-d0vknnndiees73d0n00g-a.oregon-postgres.render.com/render_db_prueba",
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

