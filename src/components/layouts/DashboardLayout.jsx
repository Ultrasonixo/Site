// src/layouts/DashboardLayout.jsx (Estrutura com Top Bar - Final)
import React, { useState } from 'react'; // Adiciona useState
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { LayoutDashboard, Package, FileText, MessageSquare, User, LogOut, Menu, X, WifiCog } from 'lucide-react';
import '../Design/DashboardPage.css';

const DashboardLayout = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false); // Estado para sidebar mobile

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

  const getInitials = (emailOrName) => {
    if (!emailOrName) return 'A';
    const nameParts = emailOrName.split(' ');
    if (nameParts.length > 1 && nameParts[0] && nameParts[nameParts.length - 1]) {
        // Pega a primeira letra do primeiro nome e a primeira do último
        return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    // Se só tiver uma parte ou algo der errado, pega a primeira letra
    return emailOrName[0].toUpperCase();
};

  const userInitial = getInitials(user?.displayName || user?.email);

  const toggleSidebarMobile = () => setIsSidebarOpenMobile(!isSidebarOpenMobile);
  const closeSidebarMobile = () => setIsSidebarOpenMobile(false);

  return (
    // Adiciona classe para controlar sidebar mobile
    <div className={`dashboard-container ${isSidebarOpenMobile ? 'sidebar-open' : ''}`}>

      {/* --- Barra Superior --- */}
      <div className="dashboard-top-bar">
         {/* Botão de Menu Mobile */}
         <button className="mobile-sidebar-toggle" onClick={toggleSidebarMobile} aria-label="Abrir menu lateral">
           <Menu size={24} />
         </button>

        {/* Logo Quadrado e Texto */}
        <div className="top-bar-brand">
           <Link to="/dashboard" className="top-bar-logo-box">
             <span>N</span>
           </Link>
           <div className="top-bar-brand-text">
               <span className="brand-title">Meu Painel</span>
               <span className="brand-subtitle">Gerencie seus serviços e configurações</span>
           </div>
        </div>

        {/* Espaçador */}
        <div style={{ flexGrow: 1 }}></div>

        {/* Informações do Utilizador (Widget) */}
        {user && (
          <div className="user-profile-widget">
            <div className="user-info-text">
              <p className="user-name">{user.displayName || user.email?.split('@')[0]}</p>
              <p className="user-email">{user.email}</p>
            </div>
            <div className="user-avatar">
              {userInitial}
            </div>
          </div>
        )}
      </div>
      {/* --- Fim da Barra Superior --- */}


      {/* --- Corpo Principal (Sidebar + Conteúdo) --- */}
      <div className="dashboard-body">
        {/* --- Sidebar --- */}
        <aside className="dashboard-sidebar">
           {/* Botão para fechar no mobile (opcional, mas bom UX) */}
           <button className="mobile-sidebar-close" onClick={closeSidebarMobile} aria-label="Fechar menu lateral">
              <X size={20} />
           </button>
           <nav>
            <ul className="sidebar-nav">
              <li><NavLink to="/dashboard" className={getNavLinkClass} end onClick={closeSidebarMobile}><LayoutDashboard /> Dashboard</NavLink></li>
              <li><NavLink to="/dashboard/servicos" className={getNavLinkClass} onClick={closeSidebarMobile}><Package /> Serviços</NavLink></li>
              <li><NavLink to="/dashboard/status" className={getNavLinkClass} onClick={closeSidebarMobile}><WifiCog /> Status</NavLink></li>
              <li><NavLink to="/dashboard/faturas" className={getNavLinkClass} onClick={closeSidebarMobile}><FileText /> Faturas</NavLink></li>
              <li><NavLink to="/dashboard/suporte" className={getNavLinkClass} onClick={closeSidebarMobile}><MessageSquare /> Suporte</NavLink></li>
              <li><NavLink to="/dashboard/minha-conta" className={getNavLinkClass} onClick={closeSidebarMobile}><User /> Minha Conta</NavLink></li>
            </ul>
           </nav>
           <div style={{ padding: '1rem 1.5rem', marginTop: 'auto' }}>
            <button onClick={handleLogout} className="sidebar-logout-button"><LogOut size={18} style={{ marginRight: '0.5rem' }} /> Sair</button>
           </div>
        </aside>

        {/* Overlay para fechar sidebar mobile */}
        {isSidebarOpenMobile && <div className="sidebar-overlay" onClick={closeSidebarMobile}></div>}

        {/* Conteúdo Principal */}
        <main className="dashboard-main">
           <div className="main-content-header">
  
           </div>
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;