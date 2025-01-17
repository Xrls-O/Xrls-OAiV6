module.exports = async (error, interaction) => {
    console.error('Error ocurrido:', error);

    if (interaction) {
        try {
            await interaction.reply({
                content: 'Ha ocurrido un error al ejecutar este comando. Por favor, intenta nuevamente.',
                ephemeral: true
            });
        } catch (replyError) {
            console.error('Error al enviar el mensaje de error:', replyError);
        }
    }
};
