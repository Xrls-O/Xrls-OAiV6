module.exports = (client) => {
  process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

  client.on('error', (error) => {
    console.error('Client Error:', error);
  });
};
