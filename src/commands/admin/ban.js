module.exports = {
  name: "ban",
  description: "Ban a user from the server.",
  execute(client, message, args) {
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Por favor menciona a un usuario para banear.");
    }
    const member = message.guild.members.cache.get(user.id);
    if (member) {
      member
        .ban({ reason: "No seguir las reglas." })
        .then(() => message.reply(`Usuario ${user.tag} baneado correctamente.`))
        .catch((err) => message.reply("No se pudo banear al usuario."));
    } else {
      message.reply("El usuario no está en el servidor.");
    }
  },
};
