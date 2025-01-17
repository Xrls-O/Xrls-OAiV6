const jokes = [
  "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.",
  "¿Qué hace una abeja en el gimnasio? Zumba.",
  "¿Cómo se dice pañuelo en japonés? Saka-moko.",
  "¿Qué le dice una impresora a otra? ¿Esa hoja es tuya o es una impresión mía?",
];

module.exports = {
  name: "joke",
  description: "Send a random joke.",
  execute(client, message) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    message.reply(`Aquí tienes un chiste: ${randomJoke}`);
  },
};
