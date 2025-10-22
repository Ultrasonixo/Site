// src/App.jsx (Corrected Import Path)

import React, { useState, useEffect } from 'react'; // Added theme hooks back
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

// Layouts
import Header from './components/Header';
import Footer from './components/Footer';
// CORRECTION: Use the path you specified
import DashboardLayout from './components/layouts/DashboardLayout';

// Páginas Públicas
import HomePage from './pages/HomePage';
import PlanosPage from './pages/PlanosPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';


// Páginas do Dashboard
import DashboardHome from './pages/DashboardPage'; // Renamed
import Servicos from './pages/Servicos';
import Faturas from './pages/Faturas';
import Suporte from './pages/Suporte';
import MinhaConta from './pages/MinhaConta';

// Componente para Layout Público
const PublicLayout = ({ children, toggleTheme, currentTheme }) => ( // Added theme props back
  <div className="app-layout">
    {/* Pass theme props to Header */}
    <Header toggleTheme={toggleTheme} currentTheme={currentTheme} />
    <main>{children}</main>
    <Footer />
  </div>
);

function App() {
  // --- LÓGICA DO TEMA --- (Added back from previous correct version)
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
        <Route path="/login" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><LoginPage /></PublicLayout>} />
        <Route path="/registrar" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><RegistroPage /></PublicLayout>} />
        

        {/* Rotas Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="servicos" element={<Servicos />} />
          <Route path="faturas" element={<Faturas />} />
          <Route path="suporte" element={<Suporte />} />
          <Route path="minha-conta" element={<MinhaConta />} />
          {/* Example for individual ticket view */}
          {/* <Route path="suporte/:ticketId" element={<TicketDetalhe />} /> */}
        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<PublicLayout toggleTheme={toggleTheme} currentTheme={theme}><div className='container section-padding' style={{textAlign: 'center'}}><h2>Página Não Encontrada</h2></div></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;