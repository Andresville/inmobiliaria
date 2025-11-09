from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import TipoPropiedad, Propiedad
from .serializers import TipoPropiedadSerializer, PropiedadSerializer

class TipoPropiedadViewSet(viewsets.ModelViewSet):
    """Permite listar y gestionar los tipos de propiedad."""
    queryset = TipoPropiedad.objects.all()
    serializer_class = TipoPropiedadSerializer
    
class PropiedadViewSet(viewsets.ModelViewSet):
    """Permite listar, buscar y gestionar las propiedades."""
    
    queryset = Propiedad.objects.filter(disponible=True).order_by('-fecha_publicacion')
    serializer_class = PropiedadSerializer
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = {
        'precio': ['gte', 'lte'],
        'ambientes': ['exact'], 
        'tipo__nombre': ['exact'],
        'ciudad': ['exact'],
    }
    
    search_fields = ['titulo', 'descripcion', 'direccion', 'ciudad']
    
    ordering_fields = ['precio', 'fecha_publicacion', 'ambientes']

    