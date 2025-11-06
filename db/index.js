import { Pool } from 'pg';



// 1. CREA EL POOL
// (Usa tus credenciales reales)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'postgres',
  port: 5432,
});





// 2. FUNCIÓN DE CONSULTA GENÉRICA
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration: `${duration}ms`});
    return res;
  } catch (err) {
    console.error('Error in query', { text });
    throw err;
  }
};






// 4. FUNCIÓN DE PRUEBA
// La exportamos para poder llamarla desde app.js
export const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ ¡Conexión exitosa a la base de datos!', res.rows[0].now);
  } catch (err) {
    console.error('❌ Error al conectar con la base de datos:', err.stack);
  }
};