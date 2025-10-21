// src/components/Header.jsx (Estrutura Corrigida)

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Design/Header.css'; // Importa o CSS corrigido

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="header-nav container">
        
        {/* 1. Logo */}
        <Link to="/" className="logo">
          SGP-RP
        </Link>

        {/* --- NOVO CONTAINER PARA OS ITENS DA DIREITA --- */}
        <div className="nav-menu-desktop">
          {/* 2. Links de Navegação (Desktop) */}
          <div className="nav-links">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/planos">Planos</NavLink>
          </div>

          {/* 3. Botões de Ação (Desktop) */}
          <div className="nav-actions">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <Link to="/registrar" className="btn-register">
              Criar Conta
            </Link>
          </div>
        </div>
        {/* --- FIM DO NOVO CONTAINER --- */}


        {/* 4. Botão do Menu Mobile (Mobile) */}
        <div className="mobile-menu-toggle">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* 5. Menu Dropdown (Mobile) */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Início
          </NavLink>
          <NavLink to="/planos" onClick={() => setIsMobileMenuOpen(false)}>
            Planos
          </NavLink>
          <hr />
          <Link to="/login" className="btn-login" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
          <Link to="/registrar" className="btn-register" onClick={() => setIsMobileMenuOpen(false)}>
            Criar Conta
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;