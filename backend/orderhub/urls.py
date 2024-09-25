from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *
from django.urls import path, re_path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic import RedirectView
from decouple import config


url = config('API')

schema_view = get_schema_view(
   openapi.Info(
      title="API Documentation",
      default_version='v1',
      description=(
         f"Esta es la documentación de la API. Esta API permite a los usuarios interactuar con nuestros servicios de forma sencilla y eficiente.<br/><br/>"
         f"Puedes acceder a la documentación interactiva de Redoc en: [{url}/redoc/]({url}/redoc/)<br/>"
         f"Redoc proporciona una visualización organizada y detallada de la API, permitiendo entender la estructura de los datos y las operaciones disponibles.<br/><br/>"
         f"También puedes acceder a la interfaz de usuario de Swagger en: [{url}/swagger/]({url}/swagger/)<br/>"
         f"Swagger ofrece una forma visual de explorar los diferentes endpoints de la API, ver ejemplos de peticiones y respuestas, "
         f"y realizar pruebas directamente desde el navegador."
      ),
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@local.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'usuario', UserApiViewSet)
router.register(r'mesa', MesaViewSet)
router.register(r'categoria', CategoriaViewSet)
router.register(r'producto', ProductoViewSet)
router.register(r'pedido', PedidoViewSet)
router.register(r'detalle-pedido', DetallePedidoViewSet)
router.register(r'pago', PagoViewSet)
router.register(r'factura', FacturaViewSet)
router.register(r'detalle-factura', DetalleFacturaViewSet)
router.register(r'reserva', ReservaViewSet)
router.register(r'envio', EnvioViewSet)
router.register(r'empleado-turno', EmpleadoTurnoViewSet)

urlpatterns = [
   path('autor/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('autor/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('autor/me/', UserView.as_view(), name='user-detail'),
   re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
   path('', RedirectView.as_view(url='swagger/', permanent=False)),
   path('', include(router.urls)),
]