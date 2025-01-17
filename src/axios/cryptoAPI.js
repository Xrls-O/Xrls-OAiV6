const axios = require('axios');

const getCryptoPrice = async (symbol) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching crypto price for ${symbol}:`, error.message);
        throw new Error('Failed to fetch cryptocurrency price.');
    }
};

module.exports = {
    getCryptoPrice,
};
