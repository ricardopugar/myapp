// Usamos import gracias a "type": "module" en package.json
import express from 'express';
// Importamos las funciones que creamos en db.js
import { query, testConnection } from './db/index.js';

const app = express();
const port = 3000;




// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Hello World! Esta es mi app de Express.');
});





// Ruta para probar la consulta
// (Asegúrate de tener una tabla llamada 'users' o cambia la consulta)
app.get('/usuarios', async (req, res) => {
  try {
    // AQUÍ ES DONDE EJECUTAS LA CONSULTA
    const result = await query('SELECT * FROM users'); 
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al consultar la base de datos');
  }
});





// Inicia el servidor
app.listen(port, () => {
  console.log(`🚀 App escuchando en http://localhost:${port}`);
  
  // Ejecuta la prueba de conexión UNA VEZ al iniciar el servidor
  testConnection();
});