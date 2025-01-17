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
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Función para verificar y arreglar dependencias
const checkAndInstallDependencies = () => {
    return new Promise((resolve, reject) => {
        const requiredDependencies = ['axios', 'discord.js', '@google-cloud/text-to-speech', 'util'];
        let missingDependencies = [];

        requiredDependencies.forEach(dep => {
            try {
                require.resolve(dep);
            } catch (e) {
                missingDependencies.push(dep);
            }
        });

        if (missingDependencies.length > 0) {
            console.log(`Faltan dependencias: ${missingDependencies.join(', ')}`);
            console.log('Instalando dependencias faltantes...');

            // Ejecutar npm install para instalar las dependencias faltantes
            exec(`npm install ${missingDependencies.join(' ')}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al instalar dependencias: ${stderr}`);
                    reject(error);
                } else {
                    console.log(`Dependencias instaladas: ${stdout}`);
                    resolve();
                }
            });
        } else {
            console.log('Todas las dependencias están instaladas.');
            resolve();
        }
    });
};

// Función para verificar si la configuración y el entorno son correctos
const validateEnvironment = () => {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.error('ERROR: La variable de entorno GOOGLE_APPLICATION_CREDENTIALS no está configurada.');
        console.error('Por favor, configura la clave de servicio de Google Cloud en el archivo .env.');
        process.exit(1);
    }

    // Verificar si la carpeta de audios existe
    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
        console.log('Creando la carpeta de audios...');
        fs.mkdirSync(audioDir);
    }
};

// Función para arrancar el bot
const startBot = async () => {
    try {
        await checkAndInstallDependencies();
        validateEnvironment();
        
        // Aquí inicias el bot (por ejemplo, con client.login() si estás usando Discord.js)
        console.log('El bot está listo para arrancar!');
    } catch (error) {
        console.error('Hubo un error al arrancar el bot:', error.message);
        process.exit(1);
    }
};

startBot();

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Contador de intentos
let attempts = 0;
const MAX_ATTEMPTS = 5;

// Estado de requerimientos aprobados
let requirementsApproved = false;

// Función para verificar y arreglar dependencias
const checkAndInstallDependencies = () => {
    return new Promise((resolve, reject) => {
        const requiredDependencies = ['axios', 'discord.js', '@google-cloud/text-to-speech', 'util'];
        let missingDependencies = [];

        requiredDependencies.forEach(dep => {
            try {
                require.resolve(dep);
            } catch (e) {
                missingDependencies.push(dep);
            }
        });

        if (missingDependencies.length > 0) {
            console.log(`Faltan dependencias: ${missingDependencies.join(', ')}`);
            console.log('Instalando dependencias faltantes...');

            // Ejecutar npm install para instalar las dependencias faltantes
            exec(`npm install ${missingDependencies.join(' ')}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al instalar dependencias: ${stderr}`);
                    reject(error);
                } else {
                    console.log(`Dependencias instaladas: ${stdout}`);
                    resolve();
                }
            });
        } else {
            console.log('Todas las dependencias están instaladas.');
            resolve();
        }
    });
};

// Función para verificar si la configuración y el entorno son correctos
const validateEnvironment = () => {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        console.error('ERROR: La variable de entorno GOOGLE_APPLICATION_CREDENTIALS no está configurada.');
        console.error('Por favor, configura la clave de servicio de Google Cloud en el archivo .env.');
        process.exit(1);
    }

    // Verificar si la carpeta de audios existe
    const audioDir = path.join(__dirname, 'audio');
    if (!fs.existsSync(audioDir)) {
        console.log('Creando la carpeta de audios...');
        fs.mkdirSync(audioDir);
    }
};

// Función para mostrar instrucciones de solución de errores
const showErrorSolution = () => {
    console.log(`
        --- ERROR CRÍTICO ---
        El bot no pudo completar los intentos para verificar los requisitos esenciales.

        Pasos para solucionar el problema:
        1. Verifica que la variable de entorno GOOGLE_APPLICATION_CREDENTIALS esté configurada correctamente en el archivo .env.
        2. Asegúrate de que tienes acceso a las credenciales de Google Cloud para el servicio de Text-to-Speech.
        3. Verifica que las dependencias de npm estén correctamente instaladas ejecutando:
            npm install axios discord.js @google-cloud/text-to-speech util
        4. Revisa los permisos en tu sistema o en Replit para asegurarte de que el bot tenga acceso a los archivos necesarios.

        Si el problema persiste, revisa los registros y vuelve a intentar.
        --- FIN DE INSTRUCCIONES ---
    `);
};

// Función para arrancar el bot con intentos limitados
const startBot = async () => {
    while (attempts < MAX_ATTEMPTS && !requirementsApproved) {
        try {
            console.log(`Intento ${attempts + 1} de ${MAX_ATTEMPTS}`);

            // Verificación de dependencias y entorno
            await checkAndInstallDependencies();
            validateEnvironment();

            // Si todo es correcto, marcamos los requisitos como aprobados
            requirementsApproved = true;
            console.log('Requisitos aprobados, el bot puede arrancar.');
            
            // Aquí puedes agregar el código para iniciar el bot, como el login de Discord, por ejemplo
            // client.login(process.env.BOT_TOKEN); 

        } catch (error) {
            attempts++;
            console.error(`Hubo un error en el intento ${attempts}:`, error.message);

            if (attempts >= MAX_ATTEMPTS) {
                showErrorSolution();
                process.exit(1);
            }
        }
    }
};

// Arrancar el bot
startBot();
