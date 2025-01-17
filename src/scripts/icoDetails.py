import requests
import os

# API endpoint para obtener información de un ICO
API_URL = "https://api.coingecko.com/api/v3/coins/markets"
CRYPTO_ID = "ethereum"  # Reemplaza con el ID de la criptomoneda/token de tu interés

def get_ico_details():
    params = {
        'vs_currency': 'usd',
        'ids': CRYPTO_ID
    }
    response = requests.get(API_URL, params=params)

    if response.status_code == 200:
        data = response.json()[0]
        print(f"ICO Details for {CRYPTO_ID}:")
        print(f"Price: ${data['current_price']}")
        print(f"Market Cap: ${data['market_cap']}")
        print(f"24h Change: {data['price_change_percentage_24h']}%")
    else:
        print(f"Error al obtener los detalles del ICO: {response.text}")

if __name__ == "__main__":
    get_ico_details()
