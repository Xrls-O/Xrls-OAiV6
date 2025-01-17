module.exports = {
  name: "guildMemberRemove",
  execute(client, member) {
    console.log(`${member.user.tag} has left the server!`);
    // Puedes agregar una acción adicional, como despedirse o registrar la salida
  },
};
