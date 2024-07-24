from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(CustomUser, name = 'Users')
admin.site.register(ConfiguracionUsuario)