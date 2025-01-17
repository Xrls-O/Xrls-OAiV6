// Requiriendo dependencias necesarias
const axios = require('axios');
const { logger } = require('../utils/logger');
const { botConfig } = require('../config/botConfig'); // Se toma la configuración del bot

class GeneralNode {
  constructor() {
    this.baseURL = botConfig.nodeApiURL;  // URL base para la conexión con el nodo
    this.apiKey = botConfig.apiKey;       // Clave de API o token para autenticación
  }

  // Método para hacer una solicitud GET a la API externa
  async fetchData(endpoint) {
    try {
      const response = await axios.get(`${this.baseURL}/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      // Llamada exitosa
      logger.info(`Data fetched successfully from ${this.baseURL}/${endpoint}`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      logger.error(`Error fetching data from ${this.baseURL}/${endpoint}: ${error.message}`);
      throw new Error('Failed to fetch data');
    }
  }

  // Método para enviar datos (POST) a la API externa
  async sendData(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      // Llamada exitosa
      logger.info(`Data sent successfully to ${this.baseURL}/${endpoint}`);
      return response.data;
    } catch (error) {
      // Manejo de errores
      logger.error(`Error sending data to ${this.baseURL}/${endpoint}: ${error.message}`);
      throw new Error('Failed to send data');
    }
  }
}

module.exports = new GeneralNode(); // Exportamos una instancia de la clase
