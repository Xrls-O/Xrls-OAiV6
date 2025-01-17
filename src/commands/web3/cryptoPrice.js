const axios = require("axios");

module.exports = {
  name: "cryptoPrice",
  description: "Get the current price of a cryptocurrency.",
  execute(client, message, args) {
    if (args.length < 1) {
      return message.reply("Por favor proporciona el nombre de la criptomoneda. Ejemplo: `!cryptoPrice bitcoin`");
    }

    const cryptoName = args[0].toLowerCase();

    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`)
      .then((response) => {
        if (!response.data[cryptoName]) {
          return message.reply("No se encontró información para esa criptomoneda.");
        }
        const price = response.data[cryptoName].usd;
        message.reply(`El precio actual de ${cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1)} es $${price} USD.`);
      })
      .catch((error) => {
        console.error(error);
        message.reply("Hubo un problema al obtener el precio.");
      });
  },
};
