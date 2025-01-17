const axios = require("axios");

module.exports = {
  name: "videoGenerator",
  description: "Generate a video based on a text prompt.",
  async execute(client, message, args) {
    if (args.length < 1) {
      return message.reply("Por favor proporciona un texto para generar el video.");
    }

    const prompt = args.join(" ");
    
    try {
      // Solicitar la generación del video a una API externa
      const response = await axios.post(
        "https://api.video-generation-service.com/v1/generate-video", // URL de la API de generación de videos
        {
          prompt: prompt, // El texto que describe el video
          video_length: 60, // Ejemplo: longitud del video en segundos
          resolution: "1920x1080", // Resolución del video
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VIDEO_API_KEY}`, // Clave API para autenticación
          },
        }
      );

      // URL del video generado
      const videoUrl = response.data.video_url;
      message.reply(`Aquí está el video generado basado en tu descripción: ${videoUrl}`);
    } catch (error) {
      console.error(error);
      message.reply("Hubo un problema al generar el video.");
    }
  },
};
