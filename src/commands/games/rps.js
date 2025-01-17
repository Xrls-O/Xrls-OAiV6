module.exports = {
  name: "rps",
  description: "Play Rock, Paper, Scissors with the bot.",
  execute(client, message, args) {
    const choices = ["piedra", "papel", "tijera"];
    const userChoice = args[0]?.toLowerCase();

    if (!choices.includes(userChoice)) {
      return message.reply(
        "Por favor elige: `piedra`, `papel` o `tijera`. Ejemplo: `!rps piedra`"
      );
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = "";
    if (userChoice === botChoice) {
      result = "Es un empate.";
    } else if (
      (userChoice === "piedra" && botChoice === "tijera") ||
      (userChoice === "papel" && botChoice === "piedra") ||
      (userChoice === "tijera" && botChoice === "papel")
    ) {
      result = "¡Ganaste!";
    } else {
      result = "Perdiste.";
    }

    message.reply(`Elegiste **${userChoice}**, yo elegí **${botChoice}**. ${result}`);
  },
};
