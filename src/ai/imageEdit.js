const axios = require("axios");

module.exports = {
  name: "imageEdit",
  description: "Edit an existing image based on a text description.",
  async execute(client, message, args) {
    if (args.length < 2) {
      return message.reply(
        "Por favor proporciona la URL de la imagen y la descripción de la edición."
      );
    }

    const imageUrl = args[0];
    const editDescription = args.slice(1).join(" ");

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/edits",
        {
          image: imageUrl,
          prompt: editDescription,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const editedImageUrl = response.data.data[0].url;
      message.reply(`Aquí está la imagen editada: ${editedImageUrl}`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un problema al editar la imagen.");
    }
  },
};
