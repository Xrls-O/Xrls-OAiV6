import discord
import os

TOKEN = os.getenv("TOKEN")

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    invite_link = discord.utils.oauth_url(client.user.id, permissions=discord.Permissions(administrator=True))
    print(f'Aquí está el enlace para invitar al bot: {invite_link}')
    await client.close()

client.run(TOKEN)
