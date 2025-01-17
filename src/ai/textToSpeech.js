const axios = require("axios");

module.exports = {
  name: "textToSpeech",
  description: "Convert a text message to speech.",
  async execute(client, message, args) {
    if (args.length < 1) {
      return message.reply("Por favor proporciona el texto que deseas convertir a voz.");
    }

    const text = args.join(" ");
    
    try {
      const response = await axios.post(
        "https://api.text-to-speech-service.com/v1/convert",
        {
          text: text,
          voice: "es-ES", // Idioma español
          format: "mp3",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.TTS_API_KEY}`,
          },
        }
      );

      const audioUrl = response.data.audio_url;
      message.reply(`Aquí está el audio generado: ${audioUrl}`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un problema al convertir el texto a voz.");
    }
  },
};
