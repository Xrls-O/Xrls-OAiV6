module.exports = {
  name: "dice",
  description: "Roll a dice. Optionally specify the number of sides.",
  execute(client, message, args) {
    const sides = parseInt(args[0]) || 6;

    if (sides < 2) {
      return message.reply("Un dado debe tener al menos 2 caras.");
    }

    const roll = Math.floor(Math.random() * sides) + 1;
    message.reply(`Lanzaste un dado de ${sides} caras y salió: **${roll}**.`);
  },
};
