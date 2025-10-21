// src/App.jsx (Limp.o e Corrigido)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// 1. CORREÇÃO: Importa o 'index.css' (onde está o .container)
import './index.css'; 

// Importe suas páginas e componentes
import HomePage from './pages/HomePage';
import PlanosPage from './pages/PlanosPage';
import Header from './components/Header';   
import Footer from './components/Footer';   

// (Páginas temporárias para os links de login/registro funcionarem)
const LoginPage = () => (
  <div className="container" style={{ padding: '5rem 1rem', minHeight: '50vh', textAlign: 'center' }}>
    <h1>Página de Login</h1>
    <p>Em construção.</p>
  </div>
);
const RegistroPage = () => (
  <div className="container" style={{ padding: '5rem 1rem', minHeight: '50vh', textAlign: 'center' }}>
    <h1>Página de Registro</h1>
    <p>Em construção.</p>
  </div>
);


function App() {
  
  return (
    <BrowserRouter>
      {/* 2. CORREÇÃO: Div limpa, sem classes Tailwind */}
      <div>
        
        <Header /> 

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planos" element={<PlanosPage />} />
            
            {/* Rotas para Login e Registro */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegistroPage />} />
            
          </Routes>
        </main>

        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;