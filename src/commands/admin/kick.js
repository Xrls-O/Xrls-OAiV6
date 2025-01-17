module.exports = {
  name: "kick",
  description: "Kick a user from the server.",
  execute(client, message, args) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Por favor menciona a un usuario
