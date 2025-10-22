// src/pages/PlanosPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
// CORREÇÃO AQUI:
import '../components/Design/PlanosPage.css'; // <-- Caminho corrigido

// Dados dos planos (iguais aos seus)
const planos = [
  { name: "Plano Básico", subtitle: "Para pequenas comunidades", price: "29,90", features: ["Gestão de B.O.s", "Gestão de Perfis (até 50)", "Sistema de Anúncios", "Suporte Básico (Ticket)"], highlighted: false },
  { name: "Plano Padrão", subtitle: "O mais popular", price: "49,90", features: ["Tudo do Básico", "Gestão de Perfis (Ilimitado)", "Relatórios e Estatísticas", "Administração RH Simplificada", "Suporte Prioritário (Discord)"], highlighted: true },
  { name: "Plano Premium", subtitle: "Gestão completa", price: "79,90", features: ["Tudo do Padrão", "Gestão de Histórico e Promoções", "Controle de Alistamentos", "Hospedagem Inclusa Premium", "Suporte Dedicado 24/7"], highlighted: false },
];

const PlanosPage = () => {
  return (
    // Usa as classes globais do index.css
    <div className="plans-page-wrapper section-padding"> 
      <div className="container">
        
        {/* Título da Página (usa classe global) */}
        <div className="section-header">
          <h1>Nossos Planos</h1>
          <p>Escolha o plano ideal para as necessidades da sua comunidade RP.</p>
        </div>

        {/* Grid de Planos */}
        <div className="plans-grid">
          {planos.map((plano) => (
            <div
              key={plano.name}
              // Classe 'highlighted' é adicionada se for true
              className={`plan-card ${plano.highlighted ? 'highlighted' : ''}`}
            >
                {/* Eu notei que você não usou o plano.name em lugar nenhum.
                  Talvez você queira trocá-lo pelo subtítulo?
                  Ex: <h2 className="plan-name">{plano.name}</h2>
                */}
              <h3 className="plan-subtitle">{plano.subtitle}</h3>
              
              <div className="plan-price">
                <span className="price-amount">R$ {plano.price}</span>
                <span className="price-period"> / por mês</span>
              </div>

              <ul className="plan-features">
                {plano.features.map((feature) => (
                  <li key={feature}>
                    <CheckCircle />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/assinar"
                // Usa as classes globais de botão
                className={`btn ${
                  plano.highlighted ? 'btn-primary-dark' : 'btn-secondary'
                }`}
              >
                Contratar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanosPage;