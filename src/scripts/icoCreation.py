from PIL import Image
import os

def create_ico(input_image_path, output_ico_path):
    try:
        # Abrir la imagen de entrada
        img = Image.open(input_image_path)
        
        # Guardar como archivo .ico
        img.save(output_ico_path, format='ICO')
        print(f"ICO creado exitosamente: {output_ico_path}")
    except Exception as e:
        print(f"Error al crear el archivo ICO: {e}")

if __name__ == "__main__":
    input_image_path = "path_to_input_image.png"  # Ruta de la imagen original
    output_ico_path = "output_icon.ico"           # Ruta de salida para el archivo .ico
    create_ico(input_image_path, output_ico_path)
