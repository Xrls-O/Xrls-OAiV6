const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const config = {
  token: process.env.DISCORD_TOKEN,
  prefix: "!",  // O el prefijo que prefieras
  botName: "MyBot"
};

// Crea el cliente de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Comandos: Carga todos los comandos de la carpeta 'commands'
const commands = [];
fs.readdirSync('./commands').forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    commandFiles.forEach(file => {
        const command = require(`./commands/${dir}/${file}`);
        commands.push(command);
    });
});

// Inicializa el bot cuando esté listo
client.once('ready', () => {
    console.log(`${config.botName} está en línea y funcionando.`);
});

// Manejo de eventos de mensajes
client.on('messageCreate', message => {
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = commands.find(c => c.name === command);
        if (cmd) cmd.execute(message, args);
    }
});

// Inicia sesión con el token del bot
client.login(config.token);
