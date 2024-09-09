# core/views.py
from django.utils.http import urlsafe_base64_encode
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import CustomUserCreateSerializer
from django.utils.http import urlsafe_base64_decode
from rest_framework.permissions import AllowAny
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str

from rest_framework import status

from .models import *

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    
    serializer = CustomUserCreateSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.is_active = False
        user.save()
        
        # Enviar el correo de confirmación
        mail_subject = 'Activar tu cuenta en nuestro gimnasio'
        activate_url = f"{settings.FRONTEND_URL}/activate/{urlsafe_base64_encode(force_bytes(user.pk))}/{default_token_generator.make_token(user)}/"
        context = {
            'user': user,
            'activate_url': activate_url,
            'protocol': 'https' if request.is_secure() else 'http',
            'domain': request.get_host(),
            'site_name': 'Gimnasio XYZ',
        }
        html_message = render_to_string('core/email_template.html', context)
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        email = EmailMultiAlternatives(
            mail_subject,
            plain_message,
            from_email,
            [user.email]
        )
        email.attach_alternative(html_message, "text/html")
        email.send()

        return Response({'message': 'Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# core/views.py



def activate_user(request, uidb64, token):
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponse('Cuenta activada exitosamente.')
    else:
        return HttpResponse('El enlace de activación es inválido o ha expirado.', status=400)



@api_view(['POST'])
@permission_classes([AllowAny])
def cambiar_contrasena(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('re_new_password')

    if not uidb64 or not token or not new_password or not confirm_password:
        return Response({"detail": "Faltan datos."}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != confirm_password:
        return Response({"detail": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = get_user_model().objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
        return Response({"detail": "El enlace no es válido."}, status=status.HTTP_400_BAD_REQUEST)

    if not default_token_generator.check_token(user, token):
        return Response({"detail": "El enlace no es válido o ha expirado."}, status=status.HTTP_400_BAD_REQUEST)

    if not user.is_active:
        return Response({"detail": "La cuenta no está activada."}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({"detail": "Contraseña cambiada con éxito."}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def verificar_token(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')

    if not uidb64 or not token:
        return Response({"detail": "UID y token son requeridos."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = get_user_model().objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
        return Response({"detail": "Usuario no encontrado."}, status=status.HTTP_400_BAD_REQUEST)

    if default_token_generator.check_token(user, token):
        return Response({"detail": "Token válido."}, status=status.HTTP_200_OK)
    else:
        return Response({"detail": "Token inválido o expirado."}, status=status.HTTP_400_BAD_REQUEST)