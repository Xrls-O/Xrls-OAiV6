module.exports = {
  name: "help",
  description: "List all available commands or info about a specific command.",
  execute(client, message, args) {
    if (args.length === 0) {
      const commands = client.commands.map((cmd) => cmd.name).join(", ");
      message.reply(`Comandos disponibles: ${commands}`);
    } else {
      const command = client.commands.get(args[0]);
      if (!command) {
        return message.reply("Comando no encontrado.");
      }
      message.reply(`Comando: ${command.name}\nDescripción: ${command.description}`);
    }
  },
};
