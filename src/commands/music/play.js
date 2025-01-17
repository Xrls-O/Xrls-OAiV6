const { QueryType } = require('discord-player');

module.exports = {
  name: 'play',
  description: 'Reproduce una canción o agrega a la cola',
  options: [
    {
      name: 'song',
      type: 3, // STRING
      description: 'Título o URL de la canción',
      required: true,
    },
  ],
  async execute(interaction, player) {
    const songQuery = interaction.options.getString('song');
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({ content: '¡Debes estar en un canal de voz para usar este comando!', ephemeral: true });
    }

    const queue = player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch {
      queue.destroy();
      return interaction.reply({ content: '¡No puedo unirme al canal de voz!', ephemeral: true });
    }

    const result = await player.search(songQuery, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!result || !result.tracks.length) {
      return interaction.reply({ content: '¡No encontré resultados para tu búsqueda!', ephemeral: true });
    }

    queue.addTracks(result.tracks);

    if (!queue.playing) await queue.play();

    return interaction.reply({
      content: `🎶 | Añadida **${result.tracks[0].title}** a la cola.`,
    });
  },
};
