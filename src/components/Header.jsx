import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react'; 
import './Design/Header.css'; // Importa o nosso novo ficheiro de estilos

const Header = () => {
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // A classe 'header-open' é adicionada quando o menu está aberto no mobile
    <header className={`header ${isMenuOpen ? 'header-open' : ''}`}>
      <div className="container header-nav">
        
        {/* Logótipo */}
        <Link to="/" className="logo">
          {/* Pode adicionar o seu <img> aqui se quiser */}
          SGP-RP
        </Link>

        {/* --- Menu para Desktop --- */}
        <div className="nav-menu-desktop">
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
              Início
            </NavLink>
            <NavLink to="/planos" className={({ isActive }) => (isActive ? 'active' : '')}>
              Planos
            </NavLink>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn-register">
               <i class="fa-solid fa-user"></i> Area do Cliente
            </Link>
          </div>
        </div>

        {/* --- Botão para Menu Mobile --- */}
        <div className="mobile-menu-toggle">
          <button onClick={toggleMenu} aria-label="Abrir menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- Menu Dropdown Mobile --- */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Início</NavLink>
          <NavLink to="/planos" onClick={() => setIsMenuOpen(false)}>Planos</NavLink>
          <hr />
          <div className="mobile-actions">
            <Link to="/login" className="btn-register" onClick={() => setIsMenuOpen(false)}>
              <i class="fa-solid fa-user"></i> Area do Cliente
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
