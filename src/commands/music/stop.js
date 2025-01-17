module.exports = {
  name: 'stop',
  description: 'Detiene la música y limpia la cola',
  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: '¡No hay nada reproduciéndose!', ephemeral: true });
    }

    queue.destroy();
    return interaction.reply({ content: '⏹ | Música detenida y cola vaciada.' });
  },
};
