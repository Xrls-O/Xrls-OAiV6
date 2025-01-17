const axios = require('axios');

const generateVideo = async (prompt) => {
    try {
        const response = await axios.post('https://api.example-videoai.com/v1/videos/generations', {
            prompt,
            resolution: '1920x1080',
        }, {
            headers: {
                Authorization: `Bearer ${process.env.VIDEO_AI_API_KEY}`,
            },
        });
        return response.data.videoUrl;
    } catch (error) {
        console.error('Error generating video:', error.message);
        throw new Error('Failed to generate video.');
    }
};

module.exports = {
    generateVideo,
};
