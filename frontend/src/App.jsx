// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PropiedadList from './pages/PropiedadList';
import PropiedadDetail from './pages/PropiedadDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<PropiedadList />} />
            <Route path="/propiedad/:id" element={<PropiedadDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;