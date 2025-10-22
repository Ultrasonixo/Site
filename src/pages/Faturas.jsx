// src/pages/Faturas.jsx
import React from 'react';
// import '../components/Design/Faturas.css';

const Faturas = () => {
  return (
    <div>
      <div className="dashboard-section-header" style={{ marginBottom: '2rem' }}>
        <h2>Minhas Faturas</h2>
        <p>Acompanhe e gerencie seus pagamentos</p>
      </div>
       <div className="content-box" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
         <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Histórico de Faturas</h3>
         {/* Adicionar filtros aqui depois */}
         <div style={{textAlign: 'center', color: 'var(--color-subtle)', padding: '2rem 0'}}>
             <p>Nenhuma fatura encontrada.</p>
         </div>
         {/* Adicionar tabela de faturas aqui depois */}
      </div>
    </div>
  );
};
export default Faturas;