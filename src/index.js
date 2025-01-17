const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const botConfig = require('./src/config/botConfig.js');
const { Player } = require('discord-player');

// Crear el cliente de Discord
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.commands = new Collection();
const commands = [];

// Leer los comandos desde la carpeta commands
const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options || [],
  });
}

// Registrar comandos con la API de Discord
const rest = new REST({ version: '9' }).setToken(botConfig.token);

(async () => {
  try {
    console.log('⏳ Actualizando comandos de aplicación...');
    await rest.put(
      Routes.applicationGuildCommands(botConfig.clientId, botConfig.guildId),
      { body: commands }
    );
    console.log('✅ Comandos registrados exitosamente.');
  } catch (error) {
    console.error('❌ Error al registrar comandos:', error);
  }
})();

// Inicializar el reproductor de música
client.player = new Player(client);

client.player.on('trackStart', (queue, track) =>
  queue.metadata.channel.send(`🎶 | Reproduciendo ahora: **${track.title}**`)
);

client.player.on('trackAdd', (queue, track) =>
  queue.metadata.channel.send(`✅ | Añadido a la cola: **${track.title}**`)
);

client.player.on('error', (queue, error) => {
  console.error(`❌ Error en la cola: ${error.message}`);
});

// Manejar eventos
const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Logear el cliente
client.once('ready', () => {
  console.log(`✅ Bot iniciado como ${client.user.tag}`);
});

client.login(botConfig.token);

const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const path = require('path');
const botConfig = require('./src/config/botConfig.js');
const { Player } = require('discord-player');
require('dotenv').config();

// Validar configuraciones de entorno
function validateEnvironment() {
  const requiredEnvVars = ['TOKEN', 'CLIENT_ID', 'GUILD_ID'];
  let missingVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    console.error(
      `❌ Error: Las siguientes variables de entorno no están configuradas: ${missingVars.join(
        ', '
      )}`
    );
    process.exit(1);
  }

  console.log('✅ Variables de entorno validadas correctamente.');
}

// Validar dependencias instaladas
function validateDependencies() {
  const requiredPackages = ['discord.js', '@discordjs/voice', 'ytdl-core'];
  let missingPackages = [];

  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
    } catch (e) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.error(
      `❌ Error: Faltan las siguientes dependencias: ${missingPackages.join(
        ', '
      )}\nEjecuta: npm install ${missingPackages.join(' ')}`
    );
    process.exit(1);
  }

  console.log('✅ Dependencias validadas correctamente.');
}

// Llamar a las validaciones
validateEnvironment();
validateDependencies();

// Crear el cliente de Discord
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.commands = new Collection();
const commands = [];

// Leer los comandos desde la carpeta commands
const commandsPath = path.join(__dirname, 'src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, command);
  commands.push({
    name: command.name,
    description: command.description,
    options: command.options || [],
  });
}

// Registrar comandos con la API de Discord
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('⏳ Actualizando comandos de aplicación...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('✅ Comandos registrados exitosamente.');
  } catch (error) {
    console.error('❌ Error al registrar comandos:', error);
  }
})();

// Inicializar el reproductor de música
client.player = new Player(client);

client.player.on('trackStart', (queue, track) =>
  queue.metadata.channel.send(`🎶 | Reproduciendo ahora: **${track.title}**`)
);

client.player.on('trackAdd', (queue, track) =>
  queue.metadata.channel.send(`✅ | Añadido a la cola: **${track.title}**`)
);

client.player.on('error', (queue, error) => {
  console.error(`❌ Error en la cola: ${error.message}`);
});

// Manejar eventos
const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Logear el cliente
client.once('ready', () => {
  console.log(`✅ Bot iniciado como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
