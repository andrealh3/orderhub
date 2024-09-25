from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "127.0.0.1", 
    "localhost",
    "orderhubbackend-c8351e7b48b8.herokuapp.com",
]

CORS_ALLOWED_ORIGINS = [
    'https://orderhubbackend-c8351e7b48b8.herokuapp.com',
    'https://order-hub-eight.vercel.app',
]

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


