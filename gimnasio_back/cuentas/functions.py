from django.core.exceptions import ValidationError

def validar_imagen(file):
    if not file.name.endswith(('.png', '.jpg', '.jpeg')):
        raise ValidationError("El archivo no es una imagen válida.")


def ruta_imagen(instance, filename):
  return 'imagen/{0}/{1}'.format(instance.usuario.username, filename)