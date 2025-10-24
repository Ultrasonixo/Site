// src/pages/Servicos.jsx (Layout de Tabela - Caminhos Corrigidos v4)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Loader2, AlertTriangle, Package, MoreVertical, Edit, Trash2, RefreshCcw } from 'lucide-react';

// CORREÇÃO: Usando caminho absoluto a partir de /src/
import { auth, db } from '/src/firebase.js';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// CORREÇÃO: Usando caminho absoluto a partir de /src/
import '/src/components/Design/Servicos.css'; // CSS Atualizado para tabela

// Componente para o menu de ações (dropdown simples)
const ActionMenu = ({ subscriptionId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: Implementar ações reais (gerenciar, renovar, cancelar)
  const handleManage = () => console.log(`Gerenciar assinatura: ${subscriptionId}`);
  const handleRenew = () => console.log(`Renovar assinatura: ${subscriptionId}`);
  const handleCancel = () => {
      // REMOVIDO: window.confirm() e alert()
      // A lógica de cancelamento (ex: abrir um modal de confirmação) deve vir aqui
      console.log(`Pedido de cancelamento para: ${subscriptionId}`);
      // TODO: Adicionar lógica para atualizar status no Firestore para 'canceled'
  };


  useEffect(() => {
    const closeMenu = (e) => {
       if (!e.target.closest(`.action-menu-container-${subscriptionId}`) && !e.target.closest(`.action-menu-button-${subscriptionId}`)) {
         setIsOpen(false);
       }
    };
    if (isOpen) {
      document.addEventListener('click', closeMenu);
    }
    return () => document.removeEventListener('click', closeMenu);
  }, [isOpen, subscriptionId]);


  return (
    <div className={`action-menu-container action-menu-container-${subscriptionId}`} style={{ position: 'relative' }}>
      <button
        className={`action-menu-button action-menu-button-${subscriptionId} btn-icon`}
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        aria-label="Ações"
      >
        <MoreVertical size={18} />
      </button>
      {isOpen && (
        <div className="action-dropdown">
          <button onClick={handleManage}><Edit size={14} /> Gerenciar</button>
          <button onClick={handleRenew}><RefreshCcw size={14} /> Renovar</button>
          <button onClick={handleCancel} className="action-cancel"><Trash2 size={14} /> Cancelar</button>
        </div>
      )}
    </div>
  );
};


const Servicos = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(auth.currentUser);

  // Observador de autenticação (sem alterações)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // Busca de assinaturas
  useEffect(() => {
    const fetchSubscriptions = async (currentUser) => {
       if (!currentUser) {
        setLoading(false); setSubscriptions([]); return;
      }
      setLoading(true); setError(''); setSubscriptions([]);
      try {
        // Query MODIFICADA: Remove o filtro de 'status' para mostrar "Todos os Serviços"
        const subscriptionsQuery = query(
          collection(db, 'users', currentUser.uid, 'subscriptions')
          // where('status', '==', 'active') // FILTRO REMOVIDO
        );
        const subscriptionSnapshots = await getDocs(subscriptionsQuery);
        if (subscriptionSnapshots.empty) { setLoading(false); return; }

        const combinedSubscriptions = [];
        for (const subDoc of subscriptionSnapshots.docs) {
          const subscriptionData = subDoc.data();
          const productId = subscriptionData.productId;
          let productDetails = { name: 'Detalhes Indisponíveis', price: '--', type: '--' }; // Default product details

          if (productId) {
            const productDocRef = doc(db, 'produtos', productId);
            const productDocSnap = await getDoc(productDocRef);
            if (productDocSnap.exists()) {
              productDetails = { id: productDocSnap.id, ...productDocSnap.data() };
            } else {
              console.warn(`Produto ${productId} não encontrado.`);
               productDetails = { name: 'Produto Removido', price: '--', type: '--' };
            }
          } else {
             console.warn(`Assinatura ${subDoc.id} sem productId.`);
          }
          combinedSubscriptions.push({
            subscriptionId: subDoc.id, ...subscriptionData, productDetails
          });
        }
         // Ordena por data de início, mais recente primeiro (opcional)
        combinedSubscriptions.sort((a, b) => (b.startDate?.toDate() || 0) - (a.startDate?.toDate() || 0));
        setSubscriptions(combinedSubscriptions);
      } catch (err) {
        console.error("Erro: ", err); setError('Erro ao carregar serviços.');
      } finally { setLoading(false); }
    };

    // Só busca se houver utilizador
     if (user) {
        fetchSubscriptions(user);
    } else {
        setLoading(false);
        setSubscriptions([]);
    }
  }, [user]); // Dependência apenas no user


  // Função para formatar a data (pode melhorar)
   const formatDate = (timestamp) => {
    if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
      // Formata como DD/MM/AAAA
      const date = timestamp.toDate();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return '--';
  };


  return (
    <div className="servicos-page-container">
      {/* Cabeçalho */}
      <div className="dashboard-section-header servicos-header">
        <div>
          <h2>Meus Serviços</h2>
          <p>Gerencie todos os seus serviços contratados</p>
        </div>
        {/* Botão Contratar Novo (Laranja) */}
        <Link to="/planos" className="btn btn-accent contratar-btn">
            <PlusCircle size={18} /> Contratar Novo
        </Link>
      </div>

       {/* Caixa Branca com Título e Tabela */}
       <div className="servicos-table-container content-box">
          <h3>Todos os Serviços</h3>

          {/* Tabela */}
          <div className="table-wrapper">
             <table>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    {/*<th>IP / Domínio</th>*/}
                    {/*<th>Localização</th>*/}
                    <th>Início/Vencimento</th> {/* Alterado o nome da coluna */}
                    <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {loading && (
                    <tr><td colSpan="5" className="table-state loading"><Loader2 className="animate-spin" /> Carregando...</td></tr>
                )}
                {!loading && error && (
                    <tr><td colSpan="5" className="table-state error"><AlertTriangle /> {error}</td></tr>
                )}
                {!loading && !error && !user && (
                    <tr><td colSpan="5" className="table-state empty">Faça login para ver seus serviços.</td></tr>
                )}
                {!loading && !error && user && subscriptions.length === 0 && (
                    <tr><td colSpan="5" className="table-state empty">Nenhum serviço encontrado.</td></tr>
                )}
                {!loading && !error && user && subscriptions.length > 0 && subscriptions.map((sub) => (
                    <tr key={sub.subscriptionId}>
                    <td data-label="Nome"><strong>{sub.productDetails?.name || 'N/A'}</strong></td>
                    <td data-label="Tipo">{sub.productDetails?.type || '--'}</td>
                    <td data-label="Status">
                        <span className={`status-badge status-${sub.status || 'unknown'}`}>
                        {sub.status || 'Desconhecido'}
                        </span>
                    </td>
                    {/*<td data-label="IP / Domínio">{sub.domain || '--'}</td>*/}
                    {/*<td data-label="Localização">{sub.location || '--'}</td>*/}
                     {/* Mostra endDate se existir, senão mostra startDate */}
                    <td data-label="Início/Vencimento">{formatDate(sub.endDate || sub.startDate)}</td>
                    <td data-label="Ações" className="actions-cell">
                        <ActionMenu subscriptionId={sub.subscriptionId} />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
       </div>
    </div>
  );
};
export default Servicos;

