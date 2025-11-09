import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          Portal Inmobiliario
        </Link>
        
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium hidden sm:inline">
            Propiedades
          </Link>
          <Link to="/contacto" className="text-gray-600 hover:text-blue-600 font-medium hidden sm:inline">
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;