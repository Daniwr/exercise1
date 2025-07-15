import pool from "./db.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-data-table', async (req, res) => {
  try {
    const tableName = 'data';

    const checkTable = await pool.query(
      'SELECT to_regclass($1) AS exists',
      [tableName]
    );

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          value TEXT,
          name TEXT,
          matri INTEGER,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res.status(201).json({ message: '✅ Tabla creada exitosamente' });
    } else {
      return res.status(200).json({ message: 'ℹ La tabla ya existe' });
    }
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.post("/savedata", async (req, res) => {
  const tableName = "data";
  const { value, name, matri } = req.body;

  try {
    await pool.query(`
        INSERT INTO ${tableName} (value, name, matri) VALUES($1, $2, $3)`, [value, name, matri]
    );
    return res.status(201).json({ message: "✅ Datos guardados exitosamente" });

  } catch(err){
    res.status(500).json({ message: "Error al procesar la solicitud"});
  }
});

app.delete('/deletetable', async (req, res) => {
  try {
    const tableName = 'data';

    const checkTable = await pool.query(
      'SELECT to_regclass($1) AS exists',
      [tableName]
    );

    if (checkTable.rows[0].exists) {
      await pool.query(`
        DROP TABLE IF EXISTS ${tableName};
      `);

      return res.status(201).json({ message: '✅ Tabla eliminada exitosamente' });
    } 
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get("/getdata", async (req, res) => {
  try{
    const tableName = "data";

    const result = await pool.query(`SELECT * FROM ${tableName};`);
    return res.status(201).json({data: result.rows});
    
  } catch(err){
    console.error("Error al obtener los datos:", err);
    res.status(500).json({ message: "Imposible obtener los datos" });
  }
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

app.get("/temperatura", (req, res) => {
  res.json({ valor: `${10} °C`, timestamp: new Date().toISOString()});
});

app.get("/uni", (req, res) => {
  res.json({ universidad: "Universidad Tecnologica de la Laguna"});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});