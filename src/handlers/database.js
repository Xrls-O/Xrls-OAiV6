const mongoose = require('mongoose');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};
