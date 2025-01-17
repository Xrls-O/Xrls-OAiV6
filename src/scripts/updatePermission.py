import discord
import os

TOKEN = os.getenv("TOKEN")
GUILD_ID = os.getenv("GUILD_ID")
CHANNEL_ID = os.getenv("CHANNEL_ID")
ROLE_ID = os.getenv("ROLE_ID")

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    guild = discord.utils.get(client.guilds, id=int(GUILD_ID))
    if guild:
        role = discord.utils.get(guild.roles, id=int(ROLE_ID))
        channel = discord.utils.get(guild.channels, id=int(CHANNEL_ID))

        if channel:
            # Modificar permisos para el canal
            await channel.set_permissions(role, send_messages=False)
            print(f"Permisos actualizados en el canal {channel.name}")
    else:
        print("Guild no encontrado.")
    
    await client.close()

client.run(TOKEN)
