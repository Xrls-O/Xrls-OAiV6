import requests
import os

API_URL = "https://api.example.com/video/generate"  # Cambiar a la URL de la API que uses
API_KEY = os.getenv("API_KEY")
PROMPT = "Create a video of a futuristic city moving across the sky"

def generate_video():
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "prompt": PROMPT,
        "duration": 30,  # Duración del video en segundos
        "resolution": "1920x1080"  # Resolución del video
    }

    response = requests.post(API_URL, headers=headers, json=data)

    if response.status_code == 200:
        video_url = response.json()['data']['video_url']
        print(f"Video generado con éxito. Puedes verlo en: {video_url}")
    else:
        print(f"Error al generar el video: {response.text}")

if __name__ == "__main__":
    generate_video()
