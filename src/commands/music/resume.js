module.exports = {
  name: 'resume',
  description: 'Reanuda la reproducción',
  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: '¡No hay nada pausado!', ephemeral: true });
    }

    queue.setPaused(false);
    return interaction.reply({ content: '▶️ | Música reanudada.' });
  },
};
