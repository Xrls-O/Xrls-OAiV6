module.exports = {
  name: 'skip',
  description: 'Salta a la siguiente canción',
  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: '¡No hay nada reproduciéndose!', ephemeral: true });
    }

    queue.skip();
    return interaction.reply({ content: '⏭ | Canción saltada.' });
  },
};
