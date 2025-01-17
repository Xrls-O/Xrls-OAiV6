const axios = require('axios');

const generateImage = async (prompt) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt,
            n: 1,
            size: '1024x1024',
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });
        return response.data.data[0].url;
    } catch (error) {
        console.error('Error generating image:', error.message);
        throw new Error('Failed to generate image.');
    }
};

module.exports = {
    generateImage,
};
