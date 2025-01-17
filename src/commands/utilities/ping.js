module.exports = {
  name: "ping",
  description: "Pong! Returns the latency of the bot.",
  execute(client, message) {
    const ping = Date.now() - message.createdTimestamp;
    message.reply(`Pong! Latency: ${ping}ms`);
  },
};
