const fs = require("fs");
const path = require("path");

module.exports = {
  name: "icoAdmin",
  description: "View and manage registered ICOs.",
  execute(client, message, args) {
    const icoDataPath = path.join(__dirname, "../../json/icoData.json");

    // Verificar si existen ICOs registradas
    if (!fs.existsSync(icoDataPath)) {
      return message.reply("No hay ICOs registradas.");
    }

    const icoData = JSON.parse(fs.readFileSync(icoDataPath, "utf8"));

    // Mostrar las ICOs registradas
    if (icoData.length === 0) {
      return message.reply("No hay ICOs registradas.");
    }

    const icoList = icoData
      .map(
        (ico, index) =>
          `${index + 1}. **${ico.name}**: ${ico.description} (Creada: ${ico.createdAt})`
      )
      .join("\n");

    message.reply(`ICOs registradas:\n${icoList}`);
  },
};
