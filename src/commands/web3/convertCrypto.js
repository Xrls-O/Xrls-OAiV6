const axios = require("axios");

module.exports = {
  name: "convertCrypto",
  description: "Convert the value of one cryptocurrency to another.",
  execute(client, message, args) {
    if (args.length < 3) {
      return message.reply("Uso incorrecto. Ejemplo: `!convertCrypto <amount> <from_currency> <to_currency>`");
    }

    const amount = parseFloat(args[0]);
    const fromCurrency = args[1].toLowerCase();
    const toCurrency = args[2].toLowerCase();

    if (isNaN(amount)) {
      return message.reply("Por favor ingresa un valor numérico válido.");
    }

    axios
      .get(`https://api.coingecko.com/api/v3/simple/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then((response) => {
        const result = response.data.result;
        if (!result) {
          return message.reply("No se pudo realizar la conversión. Verifica las criptomonedas proporcionadas.");
        }
        message.reply(`${amount} ${fromCurrency.toUpperCase()} equivalen a ${result} ${toCurrency.toUpperCase()}.`);
      })
      .catch((error) => {
        console.error(error);
        message.reply("Hubo un problema al realizar la conversión.");
      });
  },
};
