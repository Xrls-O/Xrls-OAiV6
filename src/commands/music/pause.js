module.exports = {
  name: 'pause',
  description: 'Pausa la reproducción',
  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: '¡No hay nada reproduciéndose!', ephemeral: true });
    }

    queue.setPaused(true);
    return interaction.reply({ content: '⏸ | Música pausada.' });
  },
};
