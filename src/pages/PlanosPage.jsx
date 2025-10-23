// src/pages/PlanosPage.jsx (Corrigido para importar dados)

import React, { useState, useEffect } from 'react'; // Removido useRef (não usado aqui)
import { Link } from 'react-router-dom';
import { CheckCircle, MonitorSmartphone, Bot } from 'lucide-react';
import { animate, inView, stagger } from "@motionone/dom";
import '../components/Design/PlanosPage.css';
// Importa os dados do ficheiro centralizado
import { todosOsProdutos } from '../data/produtos';

const PlanosPage = () => {
  const [selectedType, setSelectedType] = useState('site');
  // Usa os dados importados para filtrar
  const produtosFiltrados = todosOsProdutos.filter(produto => produto.type === selectedType);

  // Lógica da Animação (sem alterações)
  useEffect(() => {
    const stopObservers = [];
    const cardsParaAnimar = document.querySelectorAll(".plan-card:not(.animated)");

    cardsParaAnimar.forEach((card) => {
      animate(card, { opacity: 0, y: 50 }, { duration: 0 });
      const stopObserver = inView(
        card,
        (info) => {
          animate(
            info.target,
            { opacity: 1, y: 0 },
            { duration: 0.6, delay: stagger(0.1), easing: "ease-out" }
          );
          info.target.classList.add('animated');
        },
        { amount: 0.2 }
      );
      stopObservers.push(stopObserver);
    });

    return () => {
      stopObservers.forEach((stop) => stop());
    };
  }, [produtosFiltrados]); // Re-executa quando os produtos mudam

  return (
    <div className="plans-page-wrapper section-padding">
      <div className="container">
        <div className="section-header">
          <h1>Nossos Produtos</h1>
          <p>Escolha a solução ideal para a sua necessidade.</p>
        </div>

        {/* Seletor Site/Bot */}
        <div className="product-type-selector">
           <button className={`selector-option ${selectedType === 'site' ? 'active' : ''}`} onClick={() => setSelectedType('site')}>
            <MonitorSmartphone size={20} /> Sites
          </button>
          <button className={`selector-option ${selectedType === 'bot' ? 'active' : ''}`} onClick={() => setSelectedType('bot')}>
            <Bot size={20} /> Bots
          </button>
          <div className={`selector-switch ${selectedType === 'bot' ? 'switch-right' : ''}`}></div>
        </div>

        {/* Grid de Produtos */}
        {produtosFiltrados.length > 0 ? (
          <div className="plans-grid">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className={`plan-card ${produto.highlighted ? 'highlighted' : ''}`}
              >
                 <h2 className="plan-name">{produto.name}</h2>
                 <h3 className="plan-subtitle">{produto.subtitle}</h3>
                 <div className="plan-price">
                   <span className="price-amount">R$ {produto.price}</span>
                   <span className="price-period"> / por mês</span>
                 </div>
                 <ul className="plan-features">
                   {produto.features.map((feature) => (
                     <li key={feature}><CheckCircle /><span>{feature}</span></li>
                   ))}
                 </ul>
                 {/* Link para a nova página de detalhes */}
                 <Link to={`/produto/${produto.id}`} className={`btn ${produto.highlighted ? 'btn-primary-dark' : 'btn-secondary'}`}>
                   Ver Detalhes
                 </Link>
              </div>
            ))}
          </div>
        ) : (
           <div className="content-box no-tickets-message" style={{marginTop: '2rem', backgroundColor: 'var(--color-bg-base)', textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem'}}>
              <p>Nenhum produto do tipo "{selectedType}" encontrado no momento.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default PlanosPage;