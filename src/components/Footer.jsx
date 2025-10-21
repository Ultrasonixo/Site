// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, MessageCircle } from 'lucide-react'; // Ícones de exemplo

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">SGP-RP</h3>
            <p className="max-w-xs">
              Plataforma completa para gestão de comunidades de Roleplay Policial.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition duration-300">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/planos" className="hover:text-white transition duration-300">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registrar" className="hover:text-white transition duration-300">
                  Criar Conta
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato e Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 uppercase">Contato</h4>
            <div className="flex space-x-5">
              {/* Substitua '#' pelos seus links reais */}
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition duration-300"
                aria-label="Discord"
              >
                {/* Ícone comum para Discord (MessageCircle) ou pode baixar um SVG */}
                <MessageCircle size={24} /> 
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="mailto:contato@sgprp.com" 
                className="hover:text-white transition duration-300"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha de Copyright (abaixo das colunas) */}
        <hr className="border-gray-700 my-8" />
        <div className="text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} SGP-RP. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;