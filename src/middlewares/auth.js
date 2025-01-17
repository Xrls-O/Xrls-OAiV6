module.exports = (requiredPermissions = []) => {
    return async (interaction, next) => {
        if (!interaction.member) {
            return interaction.reply({
                content: 'No se pudo verificar la información del usuario.',
                ephemeral: true
            });
        }

        const memberPermissions = interaction.member.permissions.toArray();
        const missingPermissions = requiredPermissions.filter(
            perm => !memberPermissions.includes(perm)
        );

        if (missingPermissions.length > 0) {
            return interaction.reply({
                content: `No tienes los permisos necesarios: ${missingPermissions.join(', ')}`,
                ephemeral: true
            });
        }

        // Si el usuario tiene los permisos, continúa al siguiente middleware o comando
        await next();
    };
};
