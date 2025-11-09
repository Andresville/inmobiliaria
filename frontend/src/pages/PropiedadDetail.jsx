// src/pages/PropiedadDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropiedadCard from '../components/PropiedadCard';
import MapView from '../components/MapView';
import Slider from 'react-slick';

const API_BASE_URL = 'http://localhost:8000/api/';

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
};

const PropiedadDetail = () => {
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);
    const [similares, setSimilares] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_BASE_URL}propiedades/${id}/`)
            .then(response => {
                const data = response.data;
                setPropiedad(data);
                setLoading(false);
                fetchSimilares(data.tipo.id); 
            })
            .catch(error => {
                console.error("Error al obtener detalle:", error);
                setLoading(false);
            });
    }, [id]);

    const fetchSimilares = (tipoId) => {
        axios.get(`${API_BASE_URL}propiedades/?tipo__id=${tipoId}`)
             .then(response => {
                const suggested = response.data.filter(p => p.id !== parseInt(id)).slice(0, 3);
                setSimilares(suggested);
             })
             .catch(error => console.error("Error al obtener similares:", error));
    };

    if (loading) return <p className="text-center text-xl mt-10">Cargando detalles de la propiedad...</p>;
    if (!propiedad) return <p className="text-center text-xl mt-10 text-red-600">Propiedad no encontrada.</p>;

    const formattedPrice = new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'USD', 
        minimumFractionDigits: 0
    }).format(propiedad.precio);

    const whatsappUrl = `https://wa.me/${propiedad.numero_whatsapp}?text=Hola,%20me%20interesa%20la%20propiedad:%20${propiedad.titulo}%20(ID:%20${propiedad.id}).`;

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-4xl font-extrabold mb-2 text-blue-800">{propiedad.titulo}</h1>
            <p className="text-xl text-gray-500 mb-6">📍 {propiedad.direccion}, {propiedad.ciudad}</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="galeria mb-8 bg-gray-100 p-2 rounded-lg shadow-lg">
                        {propiedad.imagenes.length > 0 ? (
                             <Slider {...sliderSettings}>
                                {propiedad.imagenes.map((img, index) => (
                                    <div key={index}>
                                        <img 
                                            src={img.imagen} 
                                            alt={`${propiedad.titulo} - ${index}`} 
                                            className="w-full h-[400px] object-contain rounded-lg"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="text-center py-20 text-gray-500">No hay fotos disponibles.</div>
                        )}
                    </div>
                    <div className="descripcion mb-8">
                        <h2 className="text-2xl font-bold mb-3 border-b pb-1">Descripción</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{propiedad.descripcion}</p>
                    </div>
                    <div className="caracteristicas grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 p-4 border rounded-lg">
                        <p><strong>Precio:</strong> {formattedPrice}</p>
                        <p><strong>Tipo:</strong> {propiedad.tipo_nombre}</p>
                        <p><strong>Ambientes:</strong> {propiedad.ambientes}</p>
                        <p><strong>Dormitorios:</strong> {propiedad.dormitorios}</p>
                        <p><strong>Superficie Total:</strong> {propiedad.superficie_total} m²</p>
                        <p><strong>Superficie Cubierta:</strong> {propiedad.superficie_cubierta} m²</p>
                    </div>
                </div>
                <div className="lg:col-span-1 space-y-8">
                    <div className="contacto sticky top-20 p-6 bg-blue-50 border-2 border-blue-200 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold mb-4 text-blue-700">¡Consultá Ahora!</h2>
                        <p className="text-4xl font-extrabold text-green-700 mb-4">{formattedPrice}</p>
                        {propiedad.numero_whatsapp && (
                            <a 
                                href={whatsappUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 rounded-lg transition duration-200 shadow-lg"
                            >
                                💬 Contactar por WhatsApp
                            </a>
                        )}
                        <p className="text-sm text-center text-gray-500 mt-3">Respuesta inmediata</p>
                    </div>
                    {propiedad.latitud && propiedad.longitud && (
                        <div className="mapa">
                            <h2 className="text-2xl font-bold mb-3 border-b pb-1">Ubicación</h2>
                            <MapView 
                                lat={propiedad.latitud} 
                                lng={propiedad.longitud} 
                                title={propiedad.titulo}
                            />
                        </div>
                    )}
                </div>
            </div>
            {similares.length > 0 && (
                <div className="mt-12 border-t pt-8">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Propiedades Similares</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {similares.map(similar => (
                            <PropiedadCard key={similar.id} propiedad={similar} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropiedadDetail;
