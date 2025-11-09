import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Portal Inmobiliario. Desarrollado con Django & React.
        </p>
        <p className="text-xs text-gray-400">
          Teléfono: (11) 5555-6666 | Email: info@inmobiliaria.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;