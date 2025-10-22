// src/pages/Suporte.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- ADD THIS IMPORT (or add 'Link' if the import already exists)
import { FileEdit } from 'lucide-react';
// import '../components/Design/Suporte.css';

// ... rest of the component code

const Suporte = () => {
  // Dados de exemplo
  const tickets = [
  ];

  return (
    <div>
      <div className="dashboard-section-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h2>Suporte</h2>
          <p>Abra tickets e tire suas dúvidas</p>
        </div>
         <button className="btn btn-primary-dark" style={{fontSize: '0.9rem', padding: '0.6rem 1.2rem'}}>+ Novo Ticket</button>
      </div>
       <div className="content-box" style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
         <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '600' }}>Meus Tickets</h3>
         {/* Tabela de Tickets */}
         <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
           <thead>
             <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
               <th style={{ padding: '0.75rem 0.5rem' }}>ID</th>
               <th style={{ padding: '0.75rem 0.5rem' }}>Assunto</th>
               <th style={{ padding: '0.75rem 0.5rem' }}>Departamento</th>
               <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
               <th style={{ padding: '0.75rem 0.5rem' }}>Última Atualização</th>
               <th style={{ padding: '0.75rem 0.5rem' }}>Ações</th>
             </tr>
           </thead>
           <tbody>
             {tickets.length > 0 ? tickets.map(ticket => (
               <tr key={ticket.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                 <td style={{ padding: '0.75rem 0.5rem', fontWeight: '500' }}>{ticket.id}</td>
                 <td style={{ padding: '0.75rem 0.5rem' }}>{ticket.assunto}</td>
                 <td style={{ padding: '0.75rem 0.5rem' }}>{ticket.departamento}</td>
                 <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {ticket.status}
                    </span>
                 </td>
                 <td style={{ padding: '0.75rem 0.5rem' }}>{ticket.ultimaAtualizacao}</td>
                 <td style={{ padding: '0.75rem 0.5rem' }}>
                   <Link to={`/dashboard/suporte/${ticket.id}`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-primary)'}}>
                     <FileEdit size={16} style={{ marginRight: '0.3rem' }} /> Ver
                   </Link>
                 </td>
               </tr>
             )) : (
               <tr>
                 <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-subtle)', padding: '2rem 0' }}>
                   Nenhum ticket encontrado.
                 </td>
               </tr>
             )}
           </tbody>
         </table>
      </div>
    </div>
  );
};
export default Suporte;