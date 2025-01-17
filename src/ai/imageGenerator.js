const axios = require("axios");

module.exports = {
  name: "imageGeneration",
  description: "Generate an image based on a text prompt.",
  async execute(client, message, args) {
    if (args.length < 1) {
      return message.reply("Por favor proporciona un texto para generar la imagen.");
    }

    const prompt = args.join(" ");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1,
          size: "1024x1024", // Tamaño de la imagen generada
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const imageUrl = response.data.data[0].url;
      message.reply(`Aquí está la imagen generada basada en tu descripción: ${imageUrl}`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un problema al generar la imagen.");
    }
  },
};
