const fs = require("fs");
const path = require("path");

module.exports = {
  name: "createICO",
  description: "Create a new ICO with a name and description.",
  execute(client, message, args) {
    if (args.length < 2) {
      return message.reply(
        "Uso incorrecto. Ejemplo: `!createICO <ICO Name> <Description>`"
      );
    }

    const icoName = args[0];
    const icoDescription = args.slice(1).join(" ");
    const icoDataPath = path.join(__dirname, "../../json/icoData.json");

    // Leer el archivo JSON de ICOs
    let icoData = [];
    if (fs.existsSync(icoDataPath)) {
      icoData = JSON.parse(fs.readFileSync(icoDataPath, "utf8"));
    }

    // Verificar si la ICO ya existe
    if (icoData.some((ico) => ico.name === icoName)) {
      return message.reply(`La ICO "${icoName}" ya existe.`);
    }

    // Registrar la nueva ICO
    icoData.push({
      name: icoName,
      description: icoDescription,
      createdAt: new Date().toISOString(),
    });

    // Guardar los datos actualizados
    fs.writeFileSync(icoDataPath, JSON.stringify(icoData, null, 2));
    message.reply(`La ICO "${icoName}" ha sido creada con éxito.`);
  },
};
