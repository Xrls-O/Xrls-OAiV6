module.exports = {
  name: 'queue',
  description: 'Muestra la cola de canciones',
  async execute(interaction, player) {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: '¡No hay nada reproduciéndose!', ephemeral: true });
    }

    const tracks = queue.tracks.map((track, i) => `${i + 1}. **${track.title}**`).join('\n');
    const nowPlaying = `🎶 | Reproduciendo ahora: **${queue.current.title}**`;

    return interaction.reply({
      content: `${nowPlaying}\n\n**Cola:**\n${tracks || 'Vacía'}`,
    });
  },
};
