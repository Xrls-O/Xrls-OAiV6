import discord
from discord.ext import commands
import os

TOKEN = os.getenv("TOKEN")

intents = discord.Intents.default()
bot = commands.Bot(command_prefix='!', intents=intents)

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')
    # Definir los comandos a registrar
    commands = [
        discord.app_commands.Command(name='ping', description='Responde con Pong!'),
        discord.app_commands.Command(name='hello', description='Saluda al bot')
        # Agrega más comandos si es necesario
    ]
    # Registrar los comandos
    for command in commands:
        await bot.tree.add_command(command)
    print("Comandos desplegados exitosamente.")

bot.run(TOKEN)
