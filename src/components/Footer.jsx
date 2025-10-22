// src/components/Footer.jsx (Novo Layout Minimalista)

import React from 'react';
import { Link } from 'react-router-dom';
// Importe ícones para redes sociais
import { Instagram, Facebook, Youtube } from 'lucide-react'; // Ou use FontAwesome se preferir
// Importa o CSS atualizado
import './Design/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v2"> {/* Nova classe principal */}

      {/* Topo Centralizado */}
      <div className="footer-top-content container">
        {/* Logo (Pode ser texto ou <img>) */}
        <div className="footer-v2-logo">
           {/* <img src="/path/to/your/logo-white.svg" alt="SGP-RP Logo" /> */}
           SGP-RP {/* Nome do seu site */}
        </div>

        {/* Links de Navegação */}
        <nav className="footer-v2-nav">
          <Link to="/">Início</Link>
          <Link to="/planos">Planos</Link>
          {/* Adicione outros links relevantes (ex: Termos, Produtos) */}
          <Link to="#">Termos</Link>
          <Link to="/planos">Produtos</Link> {/* Aponta para Planos como página de produtos */}
        </nav>

        {/* Texto de Contato */}
        <p className="footer-contact-text">
          Não achou o que estava procurando? Entre em contato em nossas redes sociais para realizar encomendas e orçamentos.
        </p>
      </div>

      {/* Barra de Destaque Roxa */}
      <div className="footer-accent-bar">
        {/* Pode colocar um email clicável ou outro texto */}
        <a href="mailto:contato@sgprp.com">contato@sgprp.com</a> {/* Use seu email */}
      </div>

      {/* Base do Footer (Copyright e Sociais) */}
      <div className="footer-bottom-content container">
        <div className="footer-copyright-v2">
          {/* Ajuste o nome e o texto */}
          <p>© {new Date().getFullYear()} SGP-RP</p>
          <p>Todos os direitos reservados.</p>
        </div>
        <div className="footer-socials-v2">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube size={20} /></a>
          {/* Adicione outros ícones */}
        </div>
      </div>

    </footer>
  );
};

export default Footer;