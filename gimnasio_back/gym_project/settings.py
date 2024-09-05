
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent



# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-5&dx9g(+(e%!ba9&w#yfv#2--%&br5^2=6b^@k96fa)i0_b&&n'
ENVIRONMENT = os.getenv('DJANGO_ENVIRONMENT', 'development')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    "corsheaders",
    'simple_history',
    'djoser',
    'storages',
    
    'core',
    'cuentas',
    'subscripciones',
    'miembros',
    'gimnasios',
    'rutinas',
]


DJOSER = {
    'USER_CREATE_PASSWORD_RETYPE': True,
    'SEND_ACTIVATION_EMAIL': False,  # Desactiva el correo de activación de Djoser ya que estamos usando uno personalizado
    'SERIALIZERS': {
        'user_create': 'core.serializers.CustomUserCreateSerializer',
        'user': 'core.serializers.CustomUserSerializer',
        'current_user': 'core.serializers.CustomUserSerializer',
    },
}



FRONTEND_URL = os.getenv('DOMINIO_PRODUCCION')

# Configuración del backend de correo
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'nicolasmacgwrk@gmail.com'
EMAIL_HOST_PASSWORD = os.getenv('API_GOOGLE_SEND')  # Usa una contraseña de aplicación si tienes 2FA habilitado
DEFAULT_FROM_EMAIL = 'nicolasmacgwrk@gmail.com'


if ENVIRONMENT == 'development':
    STATIC_URL = '/static/'
    MEDIA_URL = '/media/'
    FILES_URL = '/files/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    FILES_ROOT = os.path.join(BASE_DIR, 'files')

# DigitalOcean Spaces settings (for production)
else:
    AWS_ACCESS_KEY_ID = os.getenv('DO_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('DO_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = 'gimnasio-space'
    AWS_S3_ENDPOINT_URL = 'https://gimnasio-space.sfo3.digitaloceanspaces.com'
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
        'ACL': 'public-read',
    }
    AWS_LOCATION = 'Files'

    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

    STATIC_URL = f'{AWS_S3_ENDPOINT_URL}/static/'
    MEDIA_URL = f'{AWS_S3_ENDPOINT_URL}/media/'
    FILES_URL = f'{AWS_S3_ENDPOINT_URL}/files/'

    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
    FILES_ROOT = os.path.join(BASE_DIR, 'files')


WSGI_APPLICATION = 'gym_project.wsgi.application'
ASGI_APPLICATION = 'gym_project.asgi.application'


CITIES_LIGHT_TRANSLATION_LANGUAGES = ['es', 'en']
CITIES_LIGHT_INCLUDE_COUNTRIES = ['CL', 'BR', 'AR', 'PE', 'EC', 'CO', 'RU', 'IT', 'ES', 'BY', 'PY']
CITIES_LIGHT_INCLUDE_CITY_TYPES = ['PPL', 'PPLA', 'PPLA2', 'PPLA3', 'PPLA4', 'PPLC', 'PPLF', 'PPLG', 'PPLL', 'PPLR', 'PPLS', 'STLMT',]


SIMPLE_HISTORY_HISTORY_CHANGE_REASON_USE_TEXT_FIELD=True
SIMPLE_HISTORY_REVERT_DISABLED=True

CORS_ORIGIN_ALLOW_ALL = True

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}



# Rutas para archivos generales
# settings.py

AUTH_USER_MODEL = 'core.CustomUser'  # Reemplaza 'tu_app' con el nombre de tu aplicación


ROOT_URLCONF = 'gym_project.urls'
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
    'simple_history.middleware.HistoryRequestMiddleware',
    
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]


AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',  # Backend de autenticación estándar de Django
)



REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
 
    
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gym_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': '5432',
    },
    'produccion': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME':  os.getenv('POSTGRES_DB_PRODUCCION'),
    'USER':  os.getenv('POSTGRES_USER_PRODUCCION'),
    'PASSWORD':  os.getenv('POSTGRES_PASSWORD_PRODUCCION'),
    'HOST':  os.getenv('POSTGRES_HOST_PRODUCCION'),  # Cambiar a 'db'
    'PORT': os.getenv('PORT'),
    'OPTIONS': {
            'sslmode': 'require',
        },
    }
}



# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
