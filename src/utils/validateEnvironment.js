function validateEnvironment() {
  const requiredEnvVars = ['TOKEN', 'CLIENT_ID', 'GUILD_ID', 'PUBLIC_KEY', 'DATABASE_URL'];
  let missingVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    console.error(
      `❌ Error: Las siguientes variables de entorno no están configuradas: ${missingVars.join(
        ', '
      )}`
    );
    process.exit(1);
  }

  console.log('✅ Variables de entorno validadas correctamente.');
}

module.exports = validateEnvironment;


