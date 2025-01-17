const fs = require("fs");
const path = require("path");

module.exports = {
  name: "viewApplications",
  description: "View all registered applications.",
  execute(client, message) {
    const appRegistryPath = path.join(__dirname, "../../json/appRegistry.json");

    // Verificar si el archivo JSON existe
    if (!fs.existsSync(appRegistryPath)) {
      return message.reply("No hay aplicaciones registradas.");
    }

    // Leer el archivo JSON
    const appRegistry = JSON.parse(fs.readFileSync(appRegistryPath, "utf8"));

    // Verificar si hay aplicaciones registradas
    if (appRegistry.length === 0) {
      return message.reply("No hay aplicaciones registradas.");
    }

    // Crear el mensaje con las aplicaciones
    const appList = appRegistry
      .map((app, index) => `${index + 1}. **${app.name}**: ${app.description}`)
      .join("\n");

    message.reply(`Aplicaciones registradas:\n${appList}`);
  },
};
