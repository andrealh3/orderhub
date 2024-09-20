from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "127.0.0.1", 
    "localhost",
    ""  # Reemplaza con tu dominio real
]

CORS_ALLOWED_ORIGINS = [
    '',  # Reemplaza con tu dominio real
]

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


