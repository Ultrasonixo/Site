// src/pages/DashboardHome.jsx (Antigo DashboardPage.jsx, agora mais simples)
import React from 'react';
import { Package, FileText, MessageSquare, User } from 'lucide-react'; // Ícones para os cards

// Importa o CSS do Dashboard (ainda necessário para os cards)
import '../components/Design/DashboardPage.css';

const DashboardHome = () => {
  return (
    <>
      {/* Título da seção (agora dentro do componente) */}
      <div className="dashboard-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Dashboard</h2>
        <p>Visão geral dos seus serviços</p>
      </div>

      {/* Cards de Resumo */}
      <div className="summary-cards">
        {/* Card Serviços Ativos */}
        <div className="summary-card">
          <div className="card-content">
            <h3>Serviços Ativos</h3>
            <p>0</p>
          </div>
          <div className="card-icon">
            <Package />
          </div>
        </div>
        {/* Card Última Fatura Paga */}
        <div className="summary-card green">
          <div className="card-content">
            <h3>Última Fatura Paga</h3>
            <p>Nenhuma</p>
          </div>
          <div className="card-icon">
            <FileText />
          </div>
        </div>
        {/* Card Tickets Abertos */}
        <div className="summary-card yellow">
          <div className="card-content">
            <h3>Tickets Abertos</h3>
            <p>0</p>
          </div>
          <div className="card-icon">
            <MessageSquare />
          </div>
        </div>
        {/* Card Avisos Importantes */}
        <div className="summary-card red">
          <div className="card-content">
            <h3>Avisos Importantes</h3>
            <p>0</p>
          </div>
          <div className="card-icon">
            <User /> {/* Use Bell ou AlertTriangle se preferir */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
