// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Layouts
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/layouts/DashboardLayout';

// Páginas Públicas
import HomePage from './pages/HomePage';
import PlanosPage from './pages/PlanosPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';
import ProdutoDetalhePage from './pages/ProdutoDetalhePage'; // <-- 1. IMPORTE A NOVA PÁGINA

// Páginas do Dashboard
import DashboardHome from './pages/DashboardPage';
import Servicos from './pages/Servicos';
import Faturas from './pages/Faturas';
import Suporte from './pages/Suporte';
import MinhaConta from './pages/MinhaConta';

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
        
        {/* --- 2. ADICIONE A NOVA ROTA AQUI --- */}
        <Route path="/produto/:id" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><ProdutoDetalhePage /></PublicLayout>} />
        
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
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><div className='container section-padding' style={{textAlign: 'center'}}><h2>Página Não Encontrada</h2></div></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;