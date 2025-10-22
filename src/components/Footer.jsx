// src/components/Footer.jsx

// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle } from 'lucide-react';
import '../components/Design/Footer.css'; // Importa nosso arquivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Coluna 1: Logo e Descrição */}
          <div className="footer-column">
            <h3 className="footer-logo">SGP-RP</h3>
            <p>
              Plataforma completa para gestão de comunidades de Roleplay Policial.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="footer-column">
            <h4 className="footer-heading">Navegação</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/planos">Planos</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registrar">Criar Conta</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato e Redes Sociais */}
          <div className="footer-column">
            <h4 className="footer-heading">Contato</h4>
            <div className="footer-socials">
              {/* Substitua '#' pelos seus links reais */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Discord"
              >
                <MessageCircle size={24} /> 
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="mailto:contato@sgprp.com" 
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Copyright (abaixo das colunas) */}
        <hr className="footer-divider" />
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} SGP-RP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;