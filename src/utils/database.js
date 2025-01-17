const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Asegúrate de configurar esta variable en tu .env
const client = new MongoClient(uri);

module.exports = {
    connect: async () => {
        try {
            await client.connect();
            console.log('Conexión exitosa a la base de datos.');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
            process.exit(1);
        }
    },

    getCollection: (dbName, collectionName) => {
        return client.db(dbName).collection(collectionName);
    },

    close: async () => {
        await client.close();
        console.log('Conexión a la base de datos cerrada.');
    },
};
