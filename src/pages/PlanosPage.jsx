// src/pages/PlanosPage.jsx (Animação de Scroll Corrigida)

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MonitorSmartphone, Bot } from 'lucide-react';
import { animate, inView, stagger } from "@motionone/dom"; // Adiciona stagger
import '../components/Design/PlanosPage.css';

// --- (Dados dos produtos - sem alterações) ---
const todosOsProdutos = [
  // ... (seus dados de sites e bots) ...
  { id: 'sgp-basico', name: "Plano Básico SGP-RP", type: 'site', subtitle: "Para pequenas comunidades", price: "29,90", features: ["Gestão de B.O.s", "Gestão de Perfis (até 50)", "Sistema de Anúncios", "Suporte Básico (Ticket)"], highlighted: false },
  { id: 'sgp-padrao', name: "Plano Padrão SGP-RP", type: 'site', subtitle: "O mais popular", price: "49,90", features: ["Tudo do Básico", "Gestão de Perfis (Ilimitado)", "Relatórios e Estatísticas", "Administração RH Simplificada", "Suporte Prioritário (Discord)"], highlighted: true },
  { id: 'sgp-premium', name: "Plano Premium SGP-RP", type: 'site', subtitle: "Gestão completa", price: "79,90", features: ["Tudo do Padrão", "Gestão de Histórico e Promoções", "Controle de Alistamentos", "Hospedagem Inclusa Premium", "Suporte Dedicado 24/7"], highlighted: false },
  { id: 'bot-moderacao', name: "Bot Moderação Discord", type: 'bot', subtitle: "Moderação Automática", price: "19,90", features: ["Moderação de chat", "Sistema de avisos", "Logs de atividade", "Comandos customizáveis"], highlighted: false },
  { id: 'bot-integracao', name: "Bot Integração FiveM", type: 'bot', subtitle: "Conecta Discord e FiveM", price: "39,90", features: ["Whitelist automática", "Status do servidor", "Chat in-game -> Discord", "Suporte Prioritário"], highlighted: true },
];
// --- FIM DOS DADOS ---

const PlanosPage = () => {
  const [selectedType, setSelectedType] = useState('site');
  const produtosFiltrados = todosOsProdutos.filter(produto => produto.type === selectedType);

  // --- LÓGICA DA ANIMAÇÃO CORRIGIDA ---
  useEffect(() => {
    // Array para guardar as funções de paragem dos observadores
    const stopObservers = [];

    // Seleciona APENAS os cards que ainda não foram animados
    const cardsParaAnimar = document.querySelectorAll(".plan-card:not(.animated)");

    cardsParaAnimar.forEach((card) => {
      // Define o estado inicial (invisível e abaixo) APENAS para estes cards
      animate(card, { opacity: 0, y: 50 }, { duration: 0 });

      // Cria um observador inView para cada card
      const stopObserver = inView(
        card,
        (info) => {
          // Aplica a animação de entrada
          animate(
            info.target,
            { opacity: 1, y: 0 },
            // Adiciona um pequeno delay usando stagger (opcional, mas fica bom)
            { duration: 0.6, delay: stagger(0.1), easing: "ease-out" }
          );
          // Marca como animado
          info.target.classList.add('animated');
          // Para de observar ESTE card específico
          // (a função stopObserver original retornada por inView já faz isso)
        },
        { amount: 0.2 } // Anima quando 20% do card está visível
      );

      // Guarda a função de paragem deste observador
      stopObservers.push(stopObserver);
    });

    // Função de Limpeza: será chamada quando o componente desmontar
    // OU antes da próxima execução do efeito (quando produtosFiltrados mudar)
    return () => {
      // Para TODOS os observadores criados nesta execução do efeito
      stopObservers.forEach((stop) => stop());
    };

  }, [produtosFiltrados]); // Re-executa apenas quando a lista de produtos muda
  // --- FIM DA LÓGICA DA ANIMAÇÃO ---

  return (
    <div className="plans-page-wrapper section-padding">
      <div className="container">
        <div className="section-header">
          <h1>Nossos Produtos</h1>
          <p>Escolha a solução ideal para a sua necessidade.</p>
        </div>

        <div className="product-type-selector">
          {/* ... (código do seletor) ... */}
           <button className={`selector-option ${selectedType === 'site' ? 'active' : ''}`} onClick={() => setSelectedType('site')}>
            <MonitorSmartphone size={20} /> Sites
          </button>
          <button className={`selector-option ${selectedType === 'bot' ? 'active' : ''}`} onClick={() => setSelectedType('bot')}>
            <Bot size={20} /> Bots
          </button>
          <div className={`selector-switch ${selectedType === 'bot' ? 'switch-right' : ''}`}></div>
        </div>

        {produtosFiltrados.length > 0 ? (
          <div className="plans-grid">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                // Adicionamos a classe 'plan-card' aqui
                className={`plan-card ${produto.highlighted ? 'highlighted' : ''}`}
                // O useEffect agora trata a adição da classe 'animated'
              >
                {/* ... (conteúdo do card) ... */}
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
                 <Link to={`/produto/${produto.id}`} className={`btn ${produto.highlighted ? 'btn-primary-dark' : 'btn-secondary'}`}>
                   Ver Detalhes
                 </Link>
              </div>
            ))}
          </div>
        ) : (
           <div className="content-box no-tickets-message" style={{marginTop: '2rem'}}>
              <p>Nenhum produto do tipo "{selectedType}" encontrado no momento.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default PlanosPage;