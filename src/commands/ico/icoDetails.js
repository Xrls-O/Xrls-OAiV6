const fs = require("fs");
const path = require("path");

module.exports = {
  name: "icoDetails",
  description: "View detailed information about a specific ICO.",
  execute(client, message, args) {
    if (args.length < 1) {
      return message.reply("Por favor proporciona el nombre de la ICO.");
    }

    const icoName = args.join(" ");
    const icoDataPath = path.join(__dirname, "../../json/icoData.json");

    // Verificar si existen ICOs registradas
    if (!fs.existsSync(icoDataPath)) {
      return message.reply("No hay ICOs registradas.");
    }

    const icoData = JSON.parse(fs.readFileSync(icoDataPath, "utf8"));

    // Buscar la ICO específica
    const ico = icoData.find((item) => item.name.toLowerCase() === icoName.toLowerCase());

    if (!ico) {
      return message.reply(`No se encontró la ICO "${icoName}".`);
    }

    message.reply(
      `Detalles de la ICO **${ico.name}**:\nDescripción: ${ico.description}\nCreada el: ${ico.createdAt}`
    );
  },
};
