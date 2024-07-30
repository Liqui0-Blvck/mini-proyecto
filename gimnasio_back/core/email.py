from djoser.email import ActivationEmail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.utils.html import strip_tags
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

class CustomActivationEmail(ActivationEmail):
    template_name = 'core/email_template.html'

    def get_context_data(self, **kwargs):
        """Obtén el contexto necesario para el email."""
        user = kwargs.get('user')
        print(f"User in context: {user}")  # Añade esta línea para depuración
        if user is None:
            raise ValueError("El usuario no puede ser None.")
        context = {
            'user': user,
            'protocol': 'https' if self.request.is_secure() else 'http',
            'domain': self.request.get_host(),
            'activate_url': self.build_activation_url(user),
            'site_name': 'Gimnasio XYZ',  # Cambia al nombre de tu gimnasio o sitio
        }
        return context



    def build_activation_url(self, user):
        """Construye la URL de activación."""
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = self.get_token(user)
        return reverse('user-activation', kwargs={'uid': uid, 'token': token})

    def send(self, to_email, **kwargs):
        """Envía el correo electrónico de activación."""
        user = kwargs.get('user')
        if user is None:
            raise ValueError("El usuario no puede ser None.")
        context = self.get_context_data(user=user)
        subject = 'Activar tu cuenta en nuestro gimnasio'
        html_message = render_to_string(self.template_name, context)
        plain_message = strip_tags(html_message)
        from_email = settings.DEFAULT_FROM_EMAIL
        email_message = EmailMultiAlternatives(subject, plain_message, from_email, [to_email])
        email_message.attach_alternative(html_message, "text/html")
        email_message.send()

