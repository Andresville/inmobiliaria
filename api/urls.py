from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TipoPropiedadViewSet, PropiedadViewSet

router = DefaultRouter()
router.register(r'tipos', TipoPropiedadViewSet)
router.register(r'propiedades', PropiedadViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
