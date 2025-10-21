// src/pages/HomePage.jsx (Versão SEM Tailwind)

import React from 'react';
import { Link } from 'react-router-dom'; 
import { CheckCircle, ShieldCheck, Zap, BarChart3, Users, Mail } from 'lucide-react';
import '../components/Design/HomePage.css'; // <-- IMPORTANTE: Importa o CSS

const HomePage = () => {

  const features = [
    { icon: ShieldCheck, title: "Gestão Policial Completa", description: "Gerencie B.O.s, perfis, histórico, promoções e mais." },
    { icon: BarChart3, title: "Relatórios e Inteligência", description: "Visualize estatísticas, mapa de calor de crimes e análise de tendências." },
    { icon: Users, title: "Administração RH Simplificada", description: "Controle alistamentos, tokens, anúncios e permissões facilmente." },
    { icon: Zap, title: "Performance e Segurança", description: "Otimizado para velocidade e protegido com recursos modernos (JWT, reCAPTCHA, Cloudflare)." },
    { icon: CheckCircle, title: "Hospedagem Inclusa", description: "Planos incluem hospedagem e domínio, sem complicações técnicas." },
    { icon: Mail, title: "Suporte Dedicado", description: "Conte com nossa equipe para auxiliar na configuração e uso." },
  ];

  const planos = [
    {
      name: "Plano Básico",
      subtitle: "Para pequenas comunidades",
      price: "29,90",
      features: [ "Gestão de B.O.s", "Gestão de Perfis (até 50)", "Sistema de Anúncios", "Suporte Básico (Ticket)" ],
      highlighted: false
    },
    {
      name: "Plano Padrão",
      subtitle: "O mais popular",
      price: "49,90",
      features: [ "Tudo do Básico", "Gestão de Perfis (Ilimitado)", "Relatórios e Estatísticas", "Administração RH Simplificada", "Suporte Prioritário (Discord)" ],
      highlighted: true
    },
    {
      name: "Plano Premium",
      subtitle: "Gestão completa",
      price: "79,90",
      features: [ "Tudo do Padrão", "Gestão de Histórico e Promoções", "Controle de Alistamentos", "Hospedagem Inclusa Premium", "Suporte Dedicado 24/7" ],
      highlighted: false
    },
  ];

  return (
    <div className="homepage-wrapper"> {/* Classe raiz */}

      {/* --- Seção Hero --- */}
      <section className="hero-section section-padding">
        <div className="container hero-content">
          <h1 className="hero-title">
            Portal Policial SGP-RP: Gestão Completa para Sua Comunidade
          </h1>
          <p className="hero-subtitle">
            Organize operações, analise dados e ofereça um portal profissional para seus cidadãos e policiais. Hospedagem e atualizações inclusas.
          </p>
          <div className="hero-actions">
            <a href="#planos" className="btn btn-primary-light">
              Ver Planos e Assinar
            </a>
          </div>
        </div>
      </section>

      {/* --- Seção de Features --- */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Recursos Poderosos para Sua Gestão</h2>
            <p>
              Tudo o que você precisa para administrar sua corporação e interagir com a comunidade de forma eficiente.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {/* Renderiza o ícone do Lucide React */}
                  <feature.icon strokeWidth={1.5} />
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Seção de Planos --- */}
      <section id="planos" className="plans-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Planos Disponíveis</h2>
            <p>
              Escolha o plano ideal para as necessidades da sua comunidade RP.
            </p>
          </div>

          <div className="plans-grid">
            {planos.map((plano) => (
              <div
                key={plano.name}
                // Adiciona a classe 'highlighted' se plano.highlighted for true
                className={`plan-card ${plano.highlighted ? 'highlighted' : ''}`}
              >
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
                  // Define o estilo do botão com base no 'highlighted'
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
      </section>

      {/* --- Seção Final CTA (Call to Action) --- */}
      <section className="cta-section section-padding">
        <div className="container cta-content">
          <h2 className="cta-title">
            Pronto para Elevar a Gestão da Sua Comunidade RP?
          </h2>
          <p className="cta-subtitle">
            Escolha o plano ideal e comece a usar o SGP-RP hoje mesmo.
          </p>
          <a href="#planos" className="btn btn-primary-light">
            Começar Agora
          </a>
        </div>
      </section>

    </div>
  );
};

export default HomePage;