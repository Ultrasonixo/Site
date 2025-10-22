// src/components/Header.jsx (Com Botão de Tema e Dropdown)
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LayoutDashboard, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import './Design/Header.css';

const Header = ({ toggleTheme, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = async () => {
    closeDropdown();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Utilizador';

  return (
    <header className={`header ${isMenuOpen ? 'header-open' : ''}`}>
      <div className="container header-nav">
        <Link to="/" className="logo">SGP-RP</Link>

        <div className="nav-menu-desktop">
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Início</NavLink>
            <NavLink to="/planos" className={({ isActive }) => (isActive ? 'active' : '')}>Planos</NavLink>
          </nav>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Mudar tema">
              {currentTheme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {user ? (
              <div className="user-widget" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="user-widget-button">
                  <User size={18} />
                  <span>{displayName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="user-dropdown">
                    <NavLink to="/dashboard" className="dropdown-item" onClick={closeDropdown}>
                      <LayoutDashboard size={16} /> Dashboard
                    </NavLink>
                    <NavLink to="/dashboard/minha-conta" className="dropdown-item" onClick={closeDropdown}>
                      <Settings size={16} /> Configurações
                    </NavLink>
                    <hr className="dropdown-divider" />
                    <button onClick={handleLogout} className="dropdown-item dropdown-item-logout">
                      <LogOut size={16} /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-register">
                <i className="fa-solid fa-user"></i> Área do Cliente
              </Link>
            )}
          </div>
        </div>

        <div className="mobile-menu-toggle">
           <button onClick={toggleTheme} className="theme-toggle-button mobile-theme-toggle" aria-label="Mudar tema">
             {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
           </button>
          <button onClick={toggleMenu} aria-label="Abrir menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={closeMenu}>Início</NavLink>
          <NavLink to="/planos" onClick={closeMenu}>Planos</NavLink>
          <hr />
          <div className="mobile-actions">
            {user ? (
              <>
                <span className="mobile-user-greeting">Olá, {displayName}</span>
                <NavLink to="/dashboard" className="mobile-dropdown-item" onClick={closeMenu}><LayoutDashboard size={16}/> Dashboard</NavLink>
                <NavLink to="/dashboard/minha-conta" className="mobile-dropdown-item" onClick={closeMenu}><Settings size={16}/> Configurações</NavLink>
                <button onClick={() => { handleLogout(); closeMenu(); }} className="mobile-dropdown-item mobile-dropdown-item-logout"><LogOut size={16}/> Sair</button>
              </>
            ) : (
              <Link to="/login" className="btn-register" onClick={closeMenu}>
                <i className="fa-solid fa-user"></i> Área do Cliente
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;