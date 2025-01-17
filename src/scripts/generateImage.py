import requests
import os

# URL de la API de generación de imágenes (puede ser DALL·E, Stable Diffusion, etc.)
API_URL = "https://api.openai.com/v1/images/generations"  # Reemplaza con la URL de la API que uses
API_KEY = os.getenv("API_KEY")  # Tu API Key
PROMPT = "A beautiful landscape of a futuristic city under a starry sky"  # Texto para generar la imagen

def generate_image():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    data = {
        "prompt": PROMPT,
        "n": 1,
        "size": "1024x1024"  # Puedes elegir el tamaño de la imagen
    }
    
    response = requests.post(API_URL, headers=headers, json=data)
    
    if response.status_code == 200:
        image_url = response.json()['data'][0]['url']
        print(f"Imagen generada con éxito. Puedes verla en: {image_url}")
    else:
        print(f"Error al generar la imagen: {response.text}")

if __name__ == "__main__":
    generate_image()
