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
const fs = require('fs');
const util = require('util');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');

const client = new TextToSpeechClient();

const generateAudio = async (text, languageCode = 'es-ES', voiceName = 'es-ES-Standard-A') => {
    try {
        const request = {
            input: { text },
            voice: { languageCode, name: voiceName },
            audioConfig: { audioEncoding: 'MP3' },
        };

        const [response] = await client.synthesizeSpeech(request);

        const writeFile = util.promisify(fs.writeFile);
        const fileName = `./audio/response_${Date.now()}.mp3`;
        await writeFile(fileName, response.audioContent, 'binary');

        console.log(`Audio content written to file: ${fileName}`);
        return fileName;
    } catch (error) {
        console.error('Error generating audio:', error.message);
        throw new Error('Failed to generate audio.');
    }
};

module.exports = { generateAudio };
