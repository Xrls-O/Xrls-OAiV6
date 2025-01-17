module.exports = {
  name: "guildMemberAdd",
  execute(client, member) {
    console.log(`${member.user.tag} has joined the server!`);
    // Puedes agregar un mensaje de bienvenida o cualquier otra acción aquí
  },
};
