const axios = require("axios");

module.exports = {
  name: "gasPrice",
  description: "Get the current gas price for Ethereum transactions.",
  execute(client, message) {
    axios
      .get("https://api.etherscan.io/api?module=gastracker&action=gasoracle")
      .then((response) => {
        const gasPrice = response.data.result;
        const fast = gasPrice.FastGasPrice;
        const standard = gasPrice.ProposeGasPrice;
        const low = gasPrice.SafeGasPrice;

        message.reply(
          `Precio del gas para transacciones de Ethereum:\n- Rápido: ${fast} Gwei\n- Estándar: ${standard} Gwei\n- Bajo: ${low} Gwei`
        );
      })
      .catch((error) => {
        console.error(error);
        message.reply("Hubo un problema al obtener el precio del gas.");
      });
  },
};
