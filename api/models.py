from django.db import models
from django.core.validators import MinValueValidator

class TipoPropiedad(models.Model):
    """Modelo para clasificar el tipo de propiedad (ej: Casa, Departamento, PH)."""
    nombre = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "Tipos de Propiedad"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Propiedad(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    tipo = models.ForeignKey(TipoPropiedad, on_delete=models.PROTECT)
    
    precio = models.DecimalField(
        max_digits=12, 
        decimal_places=2,
        validators=[MinValueValidator(0.01, message="El precio debe ser positivo.")]
    )
    ambientes = models.PositiveSmallIntegerField(default=1)
    dormitorios = models.PositiveSmallIntegerField(default=1)
    banos = models.PositiveSmallIntegerField(default=1)
    superficie_total = models.DecimalField(max_digits=8, decimal_places=2, help_text="m² totales")
    superficie_cubierta = models.DecimalField(max_digits=8, decimal_places=2, help_text="m² cubiertos")
    
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)

    latitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    disponible = models.BooleanField(default=True)
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    
    numero_whatsapp = models.CharField(
        max_length=20, 
        help_text="Número de contacto para WhatsApp (incluir código de país)",
        blank=True,
        null=True
    )
    
    class Meta:
        verbose_name_plural = "Propiedades"
        ordering = ['-fecha_publicacion']

    def __str__(self):
        return self.titulo
    

class ImagenPropiedad(models.Model):
    propiedad = models.ForeignKey(
        Propiedad, 
        related_name='imagenes',
        on_delete=models.CASCADE
    )
    imagen = models.ImageField(upload_to='propiedades_fotos/')
    es_principal = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "Imágenes de Propiedad"
        ordering = ['-es_principal']

    def __str__(self):
        return f"Imagen de {self.propiedad.titulo}"
    
