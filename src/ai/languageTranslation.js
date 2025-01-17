const axios = require("axios");

module.exports = {
  name: "languageTranslation",
  description: "Translate text from one language to another.",
  async execute(client, message, args) {
    if (args.length < 2) {
      return message.reply("Uso incorrecto. Ejemplo: `!languageTranslation <texto> <idioma_destino>`");
    }

    const text = args.slice(0, -1).join(" ");
    const targetLanguage = args[args.length - 1];

    try {
      const response = await axios.post(
        "https://api.translation-service.com/v1/translate",
        {
          text: text,
          target_language: targetLanguage,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TRANSLATION_API_KEY}`,
          },
        }
      );

      const translatedText = response.data.translated_text;
      message.reply(`Traducción a ${targetLanguage}: ${translatedText}`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un problema al traducir el texto.");
    }
  },
};
