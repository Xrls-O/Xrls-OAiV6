import os
import pymongo
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')

def setup_database():
    try:
        # Conectar a la base de datos
        client = pymongo.MongoClient(MONGODB_URI)
        db = client.get_database()
        print("Base de datos conectada exitosamente.")
        return db
    except Exception as e:
        print(f"Error al conectar con la base de datos: {e}")

if __name__ == "__main__":
    setup_database()
