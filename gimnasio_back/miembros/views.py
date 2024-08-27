from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_encode
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.conf import settings
from core.serializers import CustomUserCreateSerializer
from gimnasios.models import *
from django.contrib.auth.hashers import make_password
from cuentas.models import *
from django.db.models.signals import post_save
from django.dispatch import receiver
from core.signals import crear_perfil_usuario
from django.db import IntegrityError



class MiembrosViewSet(viewsets.ModelViewSet):
    queryset = Miembro.objects.all()
    serializer_class = MiembroSerializer
    lookup_field = 'uid'
    
    @action(detail=False, methods=['POST'], url_path='registro_miembro')
    def registrar_miembro(self, request):
        datos_nuevo_usuario = request.data.get('usuario_data')
        datos_miembro_base = request.data.get('miembro_data')

        # Desactivar el signal
        post_save.disconnect(crear_perfil_usuario, sender=settings.AUTH_USER_MODEL)

        try:
            # Crear el usuario o obtener uno existente
            usuario = CustomUser.objects.create(
                email=datos_nuevo_usuario.get('email'),
                first_name=datos_nuevo_usuario.get('first_name', ''),
                second_name=datos_nuevo_usuario.get('second_name', ''),
                father_last_name=datos_nuevo_usuario.get('father_last_name', ''),
                mother_last_name=datos_nuevo_usuario.get('mother_last_name', ''),
                is_active=False,  # Usuario inactivo hasta que confirme el correo
                password=make_password(CustomUser.objects.make_random_password())  # Contraseña temporal
            )
            
            gimnasio_instancia = Gimnasio.objects.filter(id=datos_nuevo_usuario.get('gimnasio', ''), activo=True).first()
            sucursal_instancia = Sucursal.objects.filter(id=datos_nuevo_usuario.get('sucursal', ''), activo=True).first()

            # Obtener o crear el perfil
            perfil, created = Perfil.objects.get_or_create(
                usuario=usuario,
                gimnasio=gimnasio_instancia
            )

            # Crear el miembro asociado al usuario y al gimnasio
            miembro = Miembro.objects.create(
                perfil=perfil,
                gimnasio=gimnasio_instancia,
                sucursal=sucursal_instancia,
            )
            
            
            serializer = MiembroSerializer(miembro)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except IntegrityError:
            return Response({"detail": "Error al registrar el miembro."},
                            status=status.HTTP_400_BAD_REQUEST)

        finally:
            # Volver a habilitar el signal
            post_save.connect(crear_perfil_usuario, sender=settings.AUTH_USER_MODEL)

    
    @action(detail=False, methods=['POST'], url_path='enviar_mensaje_registro')
    def envio_de_mensaje_de_confirmacion(self, request):
        # Obtener el usuario y el gimnasio
        usuario = CustomUser.objects.get(id=request.data.get('id'))
        gimnasio = Gimnasio.objects.filter(dueno=usuario, activo=True).first()
        
        if not gimnasio:
            return Response({"detail": "No se encontró un gimnasio activo para este usuario."}, status=status.HTTP_400_BAD_REQUEST)

        # Generar los tokens de activación y restablecimiento de contraseña
        confirmation_token = default_token_generator.make_token(usuario)
        password_reset_token = default_token_generator.make_token(usuario)
        uid = urlsafe_base64_encode(force_bytes(usuario.pk))
        mail_subject = 'Activar tu cuenta en nuestro gimnasio'

        # Construir la URL de activación y restablecimiento
        activate_url = f"{settings.FRONTEND_URL}/activate/{uid}/{confirmation_token}/{password_reset_token}/"

        # Construir el contexto para el correo
        context = {
            'user': usuario,
            'activate_url': activate_url,
            'protocol': 'https' if request.is_secure() else 'http',
            'domain': request.get_host(),
            'site_name': gimnasio.nombre,
        }

        # Renderizar el correo en HTML y texto plano
        html_message = render_to_string('core/email_miembros_template.html', context)
        plain_message = strip_tags(html_message)
        from_email = gimnasio.correo

        # Enviar el correo
        email = EmailMultiAlternatives(
            mail_subject,
            plain_message,
            from_email,
            [usuario.email]
        )
        email.attach_alternative(html_message, "text/html")
        email.send()

        return Response({"detail": "Correo de confirmación y restablecimiento enviado."}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['GET'], url_path='asistencia_miembro')
    def asistencia_miembro(self, request):
        uid = request.query_params.get('uid', None)  # Obtener el uid desde los parámetros de consulta
        
        if uid is not None:
            try:
                miembro = Miembro.objects.get(uid=uid)
            except Miembro.DoesNotExist:
                return Response({"detail": "Miembro no encontrado."}, status=status.HTTP_404_NOT_FOUND)
            
            asistencia = AsistenciaMiembro.objects.filter(miembro=miembro)
            serializer = AsistenciaMiembroSerializer(asistencia, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "uid es requerido."}, status=status.HTTP_400_BAD_REQUEST)
        
        
class AsistenciaMiembroViewSet(viewsets.ModelViewSet):
    queryset = AsistenciaMiembro.objects.all()
    serializer_class = AsistenciaMiembroSerializer
    
    
class SeguimientoPesoViewSet(viewsets.ModelViewSet):
    queryset = SeguimientoPeso.objects.all()
    serializer_class = SeguimientoPesoSerializer

class EvaluacionesFisicasViewSet(viewsets.ModelViewSet):
    queryset = EvaluacionesFisicas.objects.all()
    serializer_class = EvaluacionesFisicasSerializer

class MetasPersonalesViewSet(viewsets.ModelViewSet):
    queryset = MetasPersonales.objects.all()
    serializer_class = MetasPersonalesSerializer