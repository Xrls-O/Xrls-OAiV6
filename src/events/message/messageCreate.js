module.exports = {
  name: "messageCreate",
  async execute(client, message) {
    if (message.author.bot) return; // Ignorar los mensajes de otros bots

    if (message.content === "!ping") {
      message.reply("Pong!");
    }
  },
};
