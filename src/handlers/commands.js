const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = (client) => {
  client.commands = new Collection();

  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.name, command);
  }

  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un error al ejecutar el comando.");
    }
  });
};
const authMiddleware = require('../middlewares/auth');
const errorHandlerMiddleware = require('../middlewares/errorHandler');
const loggerMiddleware = require('../middlewares/logger');
const validateCommandMiddleware = require('../middlewares/validateCommand');

module.exports = (client) => {
  client.commands = new Map();

  // Aquí agregamos un middleware antes de ejecutar los comandos
  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    // Usamos los middlewares aquí
    authMiddleware(client, message, () => {
      validateCommandMiddleware(client, message, () => {
        loggerMiddleware(client, message, () => {
          errorHandlerMiddleware(client, message, async () => {
            try {
              await command.execute(client, message, args);
            } catch (error) {
              console.error(error);
              message.reply("Hubo un error al ejecutar el comando.");
            }
          });
        });
      });
    });
  });
};

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    const commands = [];
    const commandsPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(commandsPath);

    for (const folder of commandFolders) {
        const folderPath = path.join(commandsPath, folder);
        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (command.data && command.execute) {
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
            } else {
                console.warn(`El comando ${file} no tiene "data" o "execute".`);
            }
        }
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('Iniciando registro de comandos de aplicación...');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands }
        );

        console.log('Comandos registrados exitosamente.');
    } catch (error) {
        console.error('Error al registrar los comandos:', error);
    }
};
