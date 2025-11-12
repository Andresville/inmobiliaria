import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

const Filtros = ({ onApplyFilters }) => {
    const [tipos, setTipos] = useState([]);
    const [filters, setFilters] = useState({
        tipo__nombre: '',
        ciudad: '',
        ambientes: '',
        precio__lte: '',
    });

    useEffect(() => {
        axios.get(`${API_BASE_URL}tipos/`)
            .then(response => setTipos(response.data))
            .catch(error => console.error("Error cargando tipos:", error));
    }, []);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryParams = Object.keys(filters)
            .filter(key => filters[key])
            .map(key => `${key}=${filters[key]}`)
            .join('&');
            
        onApplyFilters(queryParams);
    };

    return (
        <div className="filtros-container p-4 bg-white shadow-lg rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">Buscar Propiedades</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                        name="tipo__nombre"
                        value={filters.tipo__nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="">Cualquier Tipo</option>
                        {tipos.map(tipo => (
                            <option key={tipo.id} value={tipo.nombre}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input
                        type="text"
                        name="ciudad"
                        value={filters.ciudad}
                        onChange={handleChange}
                        placeholder="Ej: Buenos Aires"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ambientes</label>
                    <input
                        type="number"
                        name="ambientes"
                        value={filters.ambientes}
                        onChange={handleChange}
                        placeholder="Mínimo 1"
                        min="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio Máx.</label>
                    <input
                        type="number"
                        name="precio__lte"
                        value={filters.precio__lte}
                        onChange={handleChange}
                        placeholder="Ej: 150000"
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="md:col-span-4 flex justify-end">
                     <button 
                        type="submit" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        🔍 Buscar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Filtros;