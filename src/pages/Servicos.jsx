// src/pages/Servicos.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Loader2,
  AlertTriangle,
  MoreVertical,
  Edit,
  Trash2,
  RefreshCcw,
} from "lucide-react";

import { auth, db } from "/src/firebase.js";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "/src/components/Design/Servicos.css";

const ActionMenu = ({ subscriptionId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleManage = () =>
    alert(`Gerenciar assinatura: ${subscriptionId}`);
  const handleRenew = () =>
    alert(`Renovar assinatura: ${subscriptionId}`);
  const handleCancel = () => {
    if (
      window.confirm(
        "Tem certeza que deseja cancelar esta assinatura?"
      )
    ) {
      alert(`Cancelar assinatura: ${subscriptionId}`);
    }
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        !e.target.closest(`.action-menu-container-${subscriptionId}`) &&
        !e.target.closest(`.action-menu-button-${subscriptionId}`)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [isOpen, subscriptionId]);

  return (
    <div
      className={`action-menu-container action-menu-container-${subscriptionId}`}
    >
      <button
        className={`action-menu-button-${subscriptionId} btn-icon`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Ações"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="action-dropdown">
          <button onClick={handleManage}>
            <Edit size={14} /> Gerenciar
          </button>
          <button onClick={handleRenew}>
            <RefreshCcw size={14} /> Renovar
          </button>
          <button onClick={handleCancel} className="action-cancel">
            <Trash2 size={14} /> Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

const Servicos = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        setSubscriptions([]);
        return;
      }

      setLoading(true);
      try {
        const subscriptionsQuery = query(
          collection(db, "users", currentUser.uid, "subscriptions")
        );
        const subscriptionSnapshots = await getDocs(subscriptionsQuery);

        if (subscriptionSnapshots.empty) {
          setSubscriptions([]);
          setLoading(false);
          return;
        }

        const combinedSubscriptions = [];
        for (const subDoc of subscriptionSnapshots.docs) {
          const subData = subDoc.data();
          const productId = subData.productId;

          let productDetails = {
            name: "Produto Indisponível",
            type: "--",
          };

          if (productId) {
            const productDocRef = doc(db, "produtos", productId);
            const productDocSnap = await getDoc(productDocRef);
            if (productDocSnap.exists()) {
              productDetails = {
                id: productDocSnap.id,
                ...productDocSnap.data(),
              };
            }
          }

          combinedSubscriptions.push({
            subscriptionId: subDoc.id,
            ...subData,
            productDetails,
          });
        }

        setSubscriptions(combinedSubscriptions);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar serviços.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSubscriptions(user);
  }, [user]);

  const formatDate = (timestamp) => {
    if (timestamp?.toDate) {
      const d = timestamp.toDate();
      return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`;
    }
    return "--";
  };

  return (
    <div className="servicos-page-container">
      <div className="dashboard-section-header servicos-header">
        <div>
          <h2>Meus Serviços</h2>
          <p>Gerencie todos os seus serviços contratados</p>
        </div>

        <Link to="/planos" className="btn btn-accent contratar-btn">
          <PlusCircle size={18} /> Contratar Novo
        </Link>
      </div>

      <div className="servicos-table-container content-box">
        <h3>Todos os Serviços</h3>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Início/Vencimento</th>
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5" className="table-state loading">
                    <Loader2 className="animate-spin" /> Carregando...
                  </td>
                </tr>
              )}
              {!loading && error && (
                <tr>
                  <td colSpan="5" className="table-state error">
                    <AlertTriangle /> {error}
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                user &&
                subscriptions.length === 0 && (
                  <tr>
                    <td colSpan="5" className="table-state empty">
                      Nenhum serviço encontrado.
                    </td>
                  </tr>
                )}

              {!loading &&
                !error &&
                user &&
                subscriptions.map((sub) => (
                  <tr key={sub.subscriptionId}>
                    <td data-label="Nome">
                      <strong>{sub.productDetails?.name}</strong>
                    </td>
                    <td data-label="Tipo">
                      {sub.productDetails?.type || "--"}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`status-badge status-${
                          sub.status || "unknown"
                        }`}
                      >
                        {sub.status || "Desconhecido"}
                      </span>
                    </td>
                    <td data-label="Início/Vencimento">
                      {formatDate(sub.endDate || sub.startDate)}
                    </td>
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
