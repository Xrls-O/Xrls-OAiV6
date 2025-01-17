const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/bot.log'); // Archivo donde se guardarán los registros

module.exports = (interaction, next) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] User: ${interaction.user.tag}, Command: ${interaction.commandName}, Channel: ${interaction.channel?.name || 'DM'}\n`;

    // Registrar en archivo
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error al registrar el log:', err);
        }
    });

    // Registrar en la consola
    console.log(logMessage.trim());

    // Continuar con el flujo del bot
    next();
};
