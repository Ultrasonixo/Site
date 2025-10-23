// src/components/Footer.jsx (CORRIGIDO: Linha superior fora do container)

import React from 'react';
import { Link } from 'react-router-dom';
import './Design/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v2">

      {/* --- LINHA DIVISÓRIA SUPERIOR (MOVIDA PARA FORA DO CONTAINER) --- */}
      <hr className="footer-divider top-divider" />
      {/* --- FIM DA LINHA --- */}


      {/* Topo Centralizado (Agora DENTRO do container) */}
      <div className="footer-top-content container">
        {/* Logo */}
        <div className="footer-v2-logo">
          SGP-RP
        </div>

        {/* Navegação */}
        <nav className="footer-v2-nav">
          <Link to="/">Início</Link>
          <Link to="/planos">Planos</Link>
          <Link to="#">Termos</Link>
          <Link to="/planos">Produtos</Link>
        </nav>

        {/* Texto de Contato */}
        <p className="footer-contact-text">
          Não achou o que estava procurando? Entre em contato em nossas redes sociais para realizar encomendas e orçamentos.
        </p>
      </div>

      {/* Barra Roxa (Já ocupa a largura toda) */}
      <div className="footer-accent-bar">
        <a href="mailto:contato@vertexsystem.com">contato@vertexsystem.com</a>
      </div>

      {/* Linha Divisória Inferior (TAMBÉM PRECISA SAIR DO CONTAINER) */}
      <hr className="footer-divider bottom-divider" />


      {/* Base do Footer (DENTRO do container) */}
      <div className="footer-bottom-content container">
        <div className="footer-copyright-v2">
          <p>© {new Date().getFullYear()} SGP-RP</p>
          <p>Todos os direitos reservados.</p>
        </div>

        {/* Ícones Sociais */}
        <div className="footer-socials-v2">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <i className="fa-brands fa-discord"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;