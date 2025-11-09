from rest_framework import serializers
from .models import TipoPropiedad, Propiedad, ImagenPropiedad

class TipoPropiedadSerializer(serializers.ModelSerializer):
    """Serializador para el modelo TipoPropiedad."""
    class Meta:
        model = TipoPropiedad
        fields = '__all__'

class ImagenPropiedadSerializer(serializers.ModelSerializer):
    """Serializador para el modelo ImagenPropiedad (fotos)."""
    class Meta:
        model = ImagenPropiedad
        fields = ('imagen', 'es_principal')
        
class PropiedadSerializer(serializers.ModelSerializer):
    """Serializador principal para el modelo Propiedad."""
    
    # Incluye las fotos de la propiedad usando el serializer anidado.
    # El source 'imagenes' coincide con el related_name en el ForeignKey.
    imagenes = ImagenPropiedadSerializer(many=True, read_only=True)
    
    # Incluye el nombre del tipo de propiedad en lugar del ID.
    tipo_nombre = serializers.ReadOnlyField(source='tipo.nombre') 
    
    class Meta:
        model = Propiedad
        fields = (
            'id', 
            'titulo', 
            'descripcion', 
            'tipo',
            'tipo_nombre',
            'precio', 
            'ambientes', 
            'dormitorios', 
            'banos', 
            'superficie_total', 
            'superficie_cubierta',
            'direccion', 
            'ciudad', 
            'latitud', 
            'longitud',
            'disponible',
            'fecha_publicacion',
            'numero_whatsapp',
            'imagenes',
        )