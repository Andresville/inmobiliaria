import React from 'react';
import { Link } from 'react-router-dom';

const PropiedadCard = ({ propiedad }) => {
    const principalImage = propiedad.imagenes.find(img => img.es_principal)?.imagen 
                          || '/placeholder-inmueble.jpg';

    const formattedPrice = new Intl.NumberFormat('es-AR', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(propiedad.precio);

    return (
        <div className="propiedad-card border rounded-lg shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden bg-white">
            <Link to={`/propiedad/${propiedad.id}`}>
                <div className="image-wrapper h-48 overflow-hidden">
                    <img 
                        src={principalImage} 
                        alt={propiedad.titulo} 
                        className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    />
                </div>
            </Link>

            <div className="p-4">
                <h3 className="text-xl font-bold truncate mb-1">
                    <Link to={`/propiedad/${propiedad.id}`} className="text-gray-800 hover:text-blue-600">
                        {propiedad.titulo}
                    </Link>
                </h3>
                <p className="text-2xl font-extrabold text-green-700 mb-3">{formattedPrice}</p>
                <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                    <span title="Ambientes">
                        <span className="font-bold">🛋️ {propiedad.ambientes}</span> Amb.
                    </span>
                    <span title="Dormitorios">
                        <span className="font-bold">🛏️ {propiedad.dormitorios}</span> Dorm.
                    </span>
                    <span title="Superficie Cubierta">
                        <span className="font-bold">📏 {propiedad.superficie_cubierta}</span> m²
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">📍 {propiedad.ciudad}</p>
            </div>
        </div>
    );
};

export default PropiedadCard;
