// src/pages/Servicos.jsx
import React from 'react';
import { PlusCircle } from 'lucide-react'; // Adiciona ícone se quiser
// Importe CSS se necessário
// import '../components/Design/Servicos.css';

const Servicos = () => {
  return (
    <div>
      <div className="dashboard-section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2>Meus Serviços</h2>
          <p>Gerencie todos os seus serviços contratados</p>
        </div>
        {/* CORRIGIDO: Muda a classe para btn-accent */}
        <button className="btn btn-accent ticket-button">
            <PlusCircle size={18} /> Contratar Novo
        </button>
      </div>
      <div className="content-box" style={{ background: 'var(--color-bg-base)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p>Nenhum serviço contratado ainda.</p>
      </div>
    </div>
  );
};
export default Servicos;