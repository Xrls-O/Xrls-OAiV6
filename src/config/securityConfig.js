require('dotenv').config();

module.exports = {
    token: process.env.TOKEN, // Token del bot
    clientId: process.env.CLIENT_ID, // ID del cliente
    publicKey: process.env.PUBLIC_KEY, // Clave pública
    mongoUri: process.env.MONGO_URI, // URI de conexión a MongoDB
    password: process.env.PASSWORD, // Contraseña del administrador, si es necesario
};
