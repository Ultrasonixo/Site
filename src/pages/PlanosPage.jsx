// src/pages/PlanosPage.jsx (Lendo do Firestore)

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MonitorSmartphone, Bot } from 'lucide-react';
import { animate, inView, stagger } from "@motionone/dom";
import '../components/Design/PlanosPage.css';

// Importações do Firebase
import { db } from '../firebase'; // Importa a instância 'db' do firebase.js
import { collection, getDocs, query, where } from 'firebase/firestore';

// --- (Dados dos produtos REMOVIDOS) ---
// const todosOsProdutos = [...]; // Esta constante foi removida

const PlanosPage = () => {
  const [selectedType, setSelectedType] = useState('site');
  const [produtos, setProdutos] = useState([]); // Estado para guardar produtos do Firestore
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // --- EFEITO PARA BUSCAR DADOS DO FIRESTORE ---
  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true); // Inicia o carregamento
      try {
        // Cria a query: busca na coleção 'produtos' onde o 'type' é igual ao 'selectedType'
        const q = query(collection(db, "produtos"), where("type", "==", selectedType));
        
        const querySnapshot = await getDocs(q);
        const produtosList = querySnapshot.docs.map(doc => ({
          id: doc.id, // Adiciona o ID do documento
          ...doc.data() // Adiciona o resto dos dados
        }));
        
        setProdutos(produtosList); // Define os produtos no estado
      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        // Tratar o erro (ex: mostrar mensagem na tela)
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchProdutos();
  }, [selectedType]); // Re-executa sempre que 'selectedType' (site/bot) mudar

  // --- LÓGICA DA ANIMAÇÃO (AJUSTADA) ---
  useEffect(() => {
    // Só executa se não estiver carregando e houver produtos
    if (loading || produtos.length === 0) return;

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

  }, [produtos, loading]); // Re-executa quando os produtos (do Firestore) mudarem ou o loading terminar
  // --- FIM DA LÓGICA DA ANIMAÇÃO ---

  const renderContent = () => {
    if (loading) {
      return (
        <div className="content-box no-tickets-message" style={{marginTop: '2rem'}}>
          <p>A carregar produtos...</p>
        </div>
      );
    }

    if (produtos.length === 0) {
      return (
        <div className="content-box no-tickets-message" style={{marginTop: '2rem'}}>
          <p>Nenhum produto do tipo "{selectedType}" encontrado no momento.</p>
        </div>
      );
    }

    return (
      <div className="plans-grid">
        {produtos.map((produto) => (
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
             {/* O Link para /produto/${produto.id} agora usa o ID do Firestore (ex: sgp-basico) */}
             <Link to={`/produto/${produto.id}`} className={`btn ${produto.highlighted ? 'btn-primary-dark' : 'btn-secondary'}`}>
               Ver Detalhes
             </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="plans-page-wrapper section-padding">
      <div className="container">
        <div className="section-header">
          <h1>Nossos Produtos</h1>
          <p>Escolha a solução ideal para a sua necessidade.</p>
        </div>

        <div className="product-type-selector">
           <button className={`selector-option ${selectedType === 'site' ? 'active' : ''}`} onClick={() => setSelectedType('site')}>
            <MonitorSmartphone size={20} /> Sites
          </button>
          <button className={`selector-option ${selectedType === 'bot' ? 'active' : ''}`} onClick={() => setSelectedType('bot')}>
            <Bot size={20} /> Bots
          </button>
          <div className={`selector-switch ${selectedType === 'bot' ? 'switch-right' : ''}`}></div>
        </div>

        {renderContent()}

      </div>
    </div>
  );
};

export default PlanosPage;