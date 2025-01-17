const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/bot.log'); // Ruta del archivo de log

module.exports = {
    log: (message) => {
        const timestamp = new Date().toISOString();
        const formattedMessage = `[${timestamp}] ${message}\n`;

        // Guardar en archivo
        fs.appendFileSync(logFilePath, formattedMessage, (err) => {
            if (err) console.error('Error al guardar el log:', err);
        });

        // Mostrar en consola
        console.log(formattedMessage.trim());
    },
};
