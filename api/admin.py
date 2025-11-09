from django.contrib import admin
from .models import TipoPropiedad, Propiedad, ImagenPropiedad

class ImagenPropiedadInline(admin.TabularInline):
    """Permite añadir imágenes directamente al editar la propiedad."""
    model = ImagenPropiedad
    extra = 1
    fields = ['imagen', 'es_principal']

class PropiedadAdmin(admin.ModelAdmin):
    """Configuración de la interfaz de Propiedad."""
    
    inlines = [ImagenPropiedadInline]

    list_display = ('titulo', 'tipo', 'precio', 'ciudad', 'disponible', 'fecha_publicacion')
    
    list_filter = ('tipo', 'disponible', 'ciudad', 'ambientes')
    
    search_fields = ('titulo', 'descripcion', 'direccion')
    
    list_display_links = ('titulo',)

    fieldsets = (
        ('Información Básica', {
            'fields': ('titulo', 'descripcion', 'tipo', 'disponible')
        }),
        ('Detalles Numéricos', {
            'fields': ('precio', 'ambientes', 'dormitorios', 'banos', 'superficie_total', 'superficie_cubierta')
        }),
        ('Ubicación y Contacto', {
            'fields': ('direccion', 'ciudad', 'latitud', 'longitud', 'numero_whatsapp')
        }),
    )

admin.site.register(TipoPropiedad)
admin.site.register(Propiedad, PropiedadAdmin)
