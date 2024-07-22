from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from .models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ('email', 'password',)  # Añade otros campos que desees incluir en la creación

class CustomUserSerializer(UserSerializer):

    class Meta(UserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'second_name', 'father_last_name', 'mother_last_name', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions',)  # Campos que quieres serializar

