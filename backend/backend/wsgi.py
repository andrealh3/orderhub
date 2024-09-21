import os
from django.core.wsgi import get_wsgi_application

env = os.getenv('DJANGO_ENV', 'desarrollo')

if env == 'produccion':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.prod')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings.dev')

# Configura la aplicación WSGI
application = get_wsgi_application()
