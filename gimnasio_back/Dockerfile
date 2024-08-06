# Usa una imagen base de Python
FROM python:3.9

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo requirements.txt y verifica su existencia
COPY requirements.txt ./
RUN ls -l /app/requirements.txt

# Instala las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código fuente
COPY . .

# Expone el puerto que utiliza la aplicación Django (8000 por defecto)
EXPOSE 8000

# Ejecuta el comando para iniciar el servidor de desarrollo
CMD ["bash", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
