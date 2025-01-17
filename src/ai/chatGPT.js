const axios = require('axios');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const chatGPT = async (prompt) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // Puedes usar otros modelos según tus necesidades
            prompt: prompt,
            max_tokens: 150,  // Controla la longitud de la respuesta
            temperature: 0.7, // Controla la creatividad (valor entre 0 y 1)
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].text.trim(); // Devuelve el texto generado por GPT-3
    } catch (error) {
        console.error('Error al generar respuesta con GPT-3:', error);
        return 'Lo siento, hubo un error al generar la respuesta. Intenta de nuevo más tarde.';
    }
};

module.exports = { chatGPT };
