// src/App.jsx (Com ProdutoDetalhePage incluída e extensões .jsx)

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Extensão .css é geralmente necessária

// Layouts
import Header from './components/Header.jsx'; // Adicionada extensão
import Footer from './components/Footer.jsx'; // Adicionada extensão
import DashboardLayout from './components/layouts/DashboardLayout.jsx'; // Adicionada extensão

// Páginas Públicas
import HomePage from './pages/HomePage.jsx'; // Adicionada extensão
import PlanosPage from './pages/PlanosPage.jsx'; // Adicionada extensão
import LoginPage from './pages/LoginPage.jsx'; // Adicionada extensão
import RegistroPage from './pages/RegistroPage.jsx'; // Adicionada extensão
import ProdutoDetalhePage from './pages/ProdutoDetalhePage.jsx'; // Adicionada extensão
import CheckoutPage from './pages/CheckoutPage.jsx';

// Páginas do Dashboard
import DashboardHome from './pages/DashboardPage.jsx'; // Adicionada extensão
import Servicos from './pages/Servicos.jsx'; // Adicionada extensão
import Faturas from './pages/Faturas.jsx'; // Adicionada extensão
import Suporte from './pages/Suporte.jsx'; // Adicionada extensão
import MinhaConta from './pages/MinhaConta.jsx'; // Adicionada extensão

// Componente para Layout Público
const PublicLayout = ({ children, toggleTheme, currentTheme }) => (
  <div className="app-layout">
    <Header toggleTheme={toggleTheme} currentTheme={currentTheme} />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  // --- LÓGICA DO TEMA --- (Seu código existente)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // --- FIM DA LÓGICA DO TEMA ---

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas - Pass theme props */}
        <Route path="/" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><HomePage /></PublicLayout>} />
        <Route path="/planos" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><PlanosPage /></PublicLayout>} />
        
        {/* A rota captura o 'produtoId' da URL, ex: /produto/sgp-basico */}
        <Route path="/produto/:produtoId" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><ProdutoDetalhePage /></PublicLayout>} />
        <Route path="/checkout/:produtoId" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><CheckoutPage /></PublicLayout>} />
        
        <Route path="/login" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><LoginPage /></PublicLayout>} />
        <Route path="/registrar" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><RegistroPage /></PublicLayout>} />
        

        {/* Rotas Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* ...suas rotas de dashboard... */}
          <Route index element={<DashboardHome />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="faturas" element={<Faturas />} />
          <Route path="suporte" element={<Suporte />} />
          <Route path="minha-conta" element={<MinhaConta />} />
          {/* Adicionei de volta a rota status que estava no seu DashboardLayout */}
          <Route path="status" element={<div className="container section-padding"><h2>Status dos Serviços (Em breve)</h2></div>} /> 
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><div className='container section-padding' style={{textAlign: 'center'}}><h2>Página Não Encontrada</h2></div></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
