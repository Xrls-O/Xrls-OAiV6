module.exports = {
  name: "messageDelete",
  execute(client, message) {
    console.log(`Message from ${message.author.tag} was deleted: ${message.content}`);
    // Puedes agregar una acción adicional, como registrar el mensaje eliminado
  },
};
