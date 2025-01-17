module.exports = (client) => {
  // Evento cuando el bot está listo
  client.once('ready', () => {
    console.log(`${client.user.tag} está listo y conectado.`);
  });

  // Evento cuando se crea un mensaje
  client.on('messageCreate', (message) => {
    // Aquí puedes agregar lógica extra para mensajes específicos
    if (message.content.includes("hola")) {
      message.reply("¡Hola! ¿En qué puedo ayudarte hoy?");
    }
  });

  // Evento cuando un miembro se une al servidor
  client.on('guildMemberAdd', (member) => {
    member.guild.channels.cache
      .find(ch => ch.name === 'bienvenida')
      .send(`Bienvenido al servidor, ${member.user.username}!`);
  });

  // Otros eventos que quieras manejar aquí

};

const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const eventsPath = path.join(__dirname, '../events');
    const eventFolders = fs.readdirSync(eventsPath);

    for (const folder of eventFolders) {
        const folderPath = path.join(eventsPath, folder);
        const eventFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(path.join(folderPath, file));
            const eventName = file.split('.')[0];
            
            if (event.once) {
                client.once(eventName, (...args) => event.execute(...args, client));
            } else {
                client.on(eventName, (...args) => event.execute(...args, client));
            }

            console.log(`Evento cargado: ${eventName}`);
        }
    }
};
