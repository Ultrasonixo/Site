// src/App.jsx (Caminhos Corrigidos)

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Caminho relativo (está na mesma pasta 'src')

// Layouts
import Header from './components/Header.jsx'; // Caminho relativo
import Footer from './components/Footer.jsx'; // Caminho relativo
import DashboardLayout from './components/layouts/DashboardLayout.jsx'; // Caminho relativo

// Páginas Públicas
import HomePage from './pages/HomePage.jsx'; // Caminho relativo
import PlanosPage from './pages/PlanosPage.jsx'; // Caminho relativo
import LoginPage from './pages/LoginPage.jsx'; // Caminho relativo
import RegistroPage from './pages/RegistroPage.jsx'; // Caminho relativo
import ProdutoDetalhePage from './pages/ProdutoDetalhePage.jsx'; // Caminho relativo
import CheckoutPage from './pages/CheckoutPage.jsx';

// Páginas do Dashboard
import DashboardHome from './pages/DashboardPage.jsx'; // Caminho relativo
import Servicos from './pages/Servicos.jsx'; // Caminho relativo
import Faturas from './pages/Faturas.jsx'; // Caminho relativo
import Suporte from './pages/Suporte.jsx'; // Caminho relativo
import MinhaConta from './pages/MinhaConta.jsx'; // Caminho relativo

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

