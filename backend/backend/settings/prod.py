from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "127.0.0.1", 
    "localhost",
    "orderhub-c5ab90f90cdb.herokuapp.com",
]

CORS_ALLOWED_ORIGINS = [
    'https://orderhub-c5ab90f90cdb.herokuapp.com',
    'https://orderhub.vercel.app',
]

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


