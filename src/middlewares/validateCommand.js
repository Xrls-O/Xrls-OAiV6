module.exports = (client) => {
    return async (interaction, next) => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({
                content: 'Este comando no está disponible o no existe.',
                ephemeral: true
            });
        }

        // Validar si el comando tiene todos los campos requeridos
        if (!command.execute || typeof command.execute !== 'function') {
            return interaction.reply({
                content: 'El comando está mal configurado y no se puede ejecutar.',
                ephemeral: true
            });
        }

        // Continuar con la ejecución del comando
        await next();
    };
};
