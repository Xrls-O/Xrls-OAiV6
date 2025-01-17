const fs = require("fs");
const path = require("path");

module.exports = {
  name: "registerApp",
  description: "Register a new application.",
  execute(client, message, args) {
    const appRegistryPath = path.join(__dirname, "../../json/appRegistry.json");

    // Validar entrada
    if (args.length < 2) {
      return message.reply(
        "Uso incorrecto. Ejemplo: `!registerApp <AppName> <Description>`"
      );
    }

    const appName = args[0];
    const appDescription = args.slice(1).join(" ");

    // Leer archivo JSON existente
    let appRegistry = [];
    if (fs.existsSync(appRegistryPath)) {
      appRegistry = JSON.parse(fs.readFileSync(appRegistryPath, "utf8"));
    }

    // Verificar si la app ya existe
    if (appRegistry.some((app) => app.name === appName)) {
      return message.reply(`La aplicación "${appName}" ya está registrada.`);
    }

    // Agregar nueva aplicación
    appRegistry.push({ name: appName, description: appDescription });

    // Guardar el archivo actualizado
    fs.writeFileSync(appRegistryPath, JSON.stringify(appRegistry, null, 2));
    message.reply(`Aplicación "${appName}" registrada correctamente.`);
  },
};
