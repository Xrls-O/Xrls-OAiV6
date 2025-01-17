function validateDependencies() {
  const requiredPackages = [
    'discord.js',
    '@discordjs/voice',
    'ytdl-core',
    'axios',
    'dotenv',
    'discord-player',
    'fs',
    'path',
  ];
  let missingPackages = [];

  for (const pkg of requiredPackages) {
    try {
      require.resolve(pkg);
    } catch (e) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.error(
      `❌ Error: Faltan las siguientes dependencias: ${missingPackages.join(
        ', '
      )}\nEjecuta: npm install ${missingPackages.join(' ')}`
    );
    process.exit(1);
  }

  console.log('✅ Dependencias validadas correctamente.');
}

module.exports = validateDependencies;
