import discord
import os

TOKEN = os.getenv("TOKEN")

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Bot is ready as {client.user}')
    # Cambiar el estado del bot
    await client.change_presence(activity=discord.Game(name="Programando en Replit"))
    print("Estado del bot actualizado.")

client.run(TOKEN)
