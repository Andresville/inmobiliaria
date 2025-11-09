import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropiedadCard from '../components/PropiedadCard';
import Filtros from '../components/Filtros';

const API_URL = 'http://localhost:8000/api/propiedades/';

const PropiedadList = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [queryParams, setQueryParams] = useState('');

    const fetchPropiedades = (params = '') => {
        setLoading(true);
        axios.get(`${API_URL}?${params}`)
            .then(response => {
                setPropiedades(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener propiedades:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchPropiedades(queryParams);
    }, [queryParams]);

    const handleApplyFilters = (newParams) => {
        setQueryParams(newParams);
    };

    return (
        <div className="listado-page-container p-4 md:p-8">
            <h1 className="text-3xl font-extrabold mb-6 text-center">Inmuebles Disponibles</h1>
            <Filtros onApplyFilters={handleApplyFilters} />
            
            <div className="propiedades-grid">
                {loading ? (
                    <p className="text-center text-xl">Cargando propiedades...</p>
                ) : propiedades.length === 0 ? (
                    <p className="text-center text-xl text-gray-500">
                        No se encontraron propiedades con esos criterios de búsqueda.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {propiedades.map(propiedad => (
                            <PropiedadCard key={propiedad.id} propiedad={propiedad} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropiedadList;
