import os
import django
from django.contrib.auth import get_user_model

# Configura Django para poder usar sus modelos
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gym_project.settings')
django.setup()

User = get_user_model()

# Verifica si ya existe un superusuario
if not User.objects.filter(is_superuser=True).exists():
    print("Creando superusuario...")
    User.objects.create_superuser(
        email=os.getenv('DJANGO_SUPERUSER_EMAIL'),
        password=os.getenv('DJANGO_SUPERUSER_PASSWORD')
    )
else:
    print("El superusuario ya existe.")
