
def ruta_video(instance, filename):
    return 'videos/{0}/{1}'.format(f'{instance.nombre} {instance.categoria}', filename)