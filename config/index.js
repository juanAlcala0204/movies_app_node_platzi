require('dotenv').config();

// Se crea objeto de configuración.
const config = {
    // Variable que comprueba si está en producción o en desarrollo
    dev: process.env.NODE_ENV !== 'production',
    // Variable de entorno port.
    port: process.env.PORT || 3000,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME
}

module.exports = { config };