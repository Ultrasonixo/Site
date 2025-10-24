// src/pages/CheckoutPage.jsx (Atualizado para Backend)
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertTriangle, ArrowLeft, ShoppingCart, CheckCircle, CreditCard, ShieldAlert } from 'lucide-react'; // Adiciona CreditCard, ShieldAlert

// Importações Firebase
// CORREÇÃO: Revertendo para caminho relativo com ../
import { auth, db } from '../firebase.js';
import { getFunctions, httpsCallable } from "firebase/functions"; // Mantém esta importação
import { doc, getDoc, collection, query, where, getDocs, serverTimestamp, addDoc } from 'firebase/firestore'; // Adiciona addDoc
import { onAuthStateChanged } from 'firebase/auth';

// Importa CSS
// CORREÇÃO: Revertendo para caminho relativo com ../
import '../components/Design/CheckoutPage.css';

// Inicializa o Firebase Functions
const functions = getFunctions();
// Define o nome da nossa Cloud Function (deve ser o mesmo nome exportado no index.js)
const createPaymentLink = httpsCallable(functions, 'createPaymentLink');


const CheckoutPage = () => {
  const { produtoId } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(null); // null = verificando, true = sim, false = não
  const [loadingCheck, setLoadingCheck] = useState(true); // Loading da verificação

  // Observador de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Busca detalhes do produto
  useEffect(() => {
    const fetchProduto = async () => {
      if (!produtoId) {
        setError('Nenhum produto selecionado.');
        setLoadingProduct(false);
        setLoadingCheck(false); // Para check se produtoId for inválido
        return;
      }
      setLoadingProduct(true);
      setError('');
      try {
        const docRef = doc(db, "produtos", produtoId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Produto não encontrado.');
          setLoadingCheck(false); // Para check se produto não existe
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError('Erro ao carregar detalhes do produto.');
        setLoadingCheck(false); // Para check se houve erro
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduto();
  }, [produtoId]);

  // Efeito para VERIFICAR se o utilizador já tem esta assinatura
  useEffect(() => {
    // Só verifica se temos utilizador e se o produto já foi carregado
    if (!user || loadingProduct) {
      // Se não há user, ou o produto ainda está a carregar, não podemos verificar
       if (!user && !loadingProduct) setLoadingCheck(false); // Se não há user e produto carregou, para o loading
      return;
    }
     // Se houve erro ao carregar produto, não verifica
    if (error && !produto) {
      setLoadingCheck(false);
      return
    }

    setLoadingCheck(true);
    setHasSubscription(null); // Reinicia estado

    const checkSubscription = async () => {
      try {
        const q = query(
          collection(db, 'users', user.uid, 'subscriptions'),
          where('productId', '==', produtoId),
          where('status', '==', 'active') // Apenas assinaturas ativas
        );
        const querySnapshot = await getDocs(q);
        
        setHasSubscription(!querySnapshot.empty); // true se encontrar, false se não
        
      } catch (err) {
        console.error("Erro ao verificar assinatura:", err);
        setError('Erro ao verificar suas assinaturas atuais.');
        setHasSubscription(false); // Assume que não tem em caso de erro
      } finally {
        setLoadingCheck(false);
      }
    };

    checkSubscription();
  }, [user, produtoId, produto, loadingProduct, error]); // Depende de todos estes


  // --- FUNÇÃO DE PAGAMENTO ATUALIZADA ---
  const handleGoToPayment = async () => {
    if (!user || !produto || hasSubscription || isProcessing) {
       if (hasSubscription) setError('Você já possui uma assinatura ativa deste produto.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // 1. Chama a Cloud Function 'createPaymentLink'
      console.log("Chamando Cloud Function 'createPaymentLink' com:", { produtoId: produto.id });
      
      // Simulação de chamada à Cloud Function (para teste local sem deploy)
      if (window.location.hostname === "localhost") {
        console.warn("MODO DE SIMULAÇÃO (Localhost): Criando assinatura de teste diretamente no Firestore.");
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula espera
        
        // --- SIMULAÇÃO DE CRIAÇÃO (SÓ PARA TESTE LOCAL) ---
        const userSubscriptionsRef = collection(db, 'users', user.uid, 'subscriptions');
        await addDoc(userSubscriptionsRef, {
          productId: produto.id,
          status: 'active', // Simula pagamento aprovado
          startDate: serverTimestamp(),
          productName: produto.name,
          priceAtPurchase: produto.price,
          purchaseMethod: "simulated_local"
        });
        
        console.log("Simulação concluída. Redirecionando...");
        navigate('/dashboard/servicos');
        
      } else {
        // --- LÓGICA DE PRODUÇÃO (CHAMADA REAL) ---
        const result = await createPaymentLink({ produtoId: produto.id });
        
        const paymentUrl = result.data.paymentUrl;
        if (!paymentUrl) {
          throw new Error("Link de pagamento não recebido do servidor.");
        }

        console.log("Redirecionando para:", paymentUrl);
        window.location.href = paymentUrl; // Redirecionamento real
      }

    } catch (err) {
      console.error("Erro ao chamar Cloud Function ou simular:", err);
      // Mostra erros da Cloud Function para o utilizador
      setError(err.message || 'Ocorreu um erro ao preparar o pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };
  // --- FIM DA ATUALIZAÇÃO ---


  const isLoading = loadingProduct || loadingCheck;

  // --- Renderização Condicional ---
   if (!isLoading && !user) { // Verifica user SÓ DEPOIS de carregar
     return (
        <div className="checkout-wrapper section-padding error-state">
            <AlertTriangle size={48} color="var(--color-danger)" />
            <h2>Autenticação Necessária</h2>
            <p>Você precisa estar logado para completar a assinatura.</p>
            <Link to={`/login?redirect=/checkout/${produtoId}`} className="btn btn-primary-dark">
               Ir para Login
            </Link>
             <Link to="/planos" className="btn btn-secondary" style={{marginLeft: '1rem'}}>
                Voltar aos Planos
            </Link>
        </div>
     )
   }


  if (isLoading) {
    return (
      <div className="checkout-wrapper section-padding loading-state">
        <Loader2 className="animate-spin" size={48} />
        <p>A carregar checkout...</p>
      </div>
    );
  }

  if (error && !produto) { // Mostra erro se o produto não foi carregado
    return (
      <div className="checkout-wrapper section-padding error-state">
        <AlertTriangle size={48} color="var(--color-danger)" />
        <h2>Erro no Checkout</h2>
        <p>{error}</p>
        <Link to="/planos" className="btn btn-secondary">
          <ArrowLeft size={18} /> Voltar aos Planos
        </Link>
      </div>
    );
  }
   // --- Fim Renderização Condicional ---


  return (
    <div className="checkout-wrapper section-padding">
      <div className="container checkout-container">

        <div style={{ marginBottom: '2rem' }}>
          {/* Link de volta para a página de detalhes do produto */}
          <Link to={produto ? `/produto/${produto.id}` : '/planos'} className="back-link">
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>

        <h1>Confirmar Assinatura</h1>

        <div className="checkout-content">
          <div className="order-summary">
            <h2>Resumo do Pedido</h2>
            {produto ? (
              <div className="product-info">
                <ShoppingCart size={40} className="product-icon" />
                <div className="product-details">
                  <h3>{produto.name}</h3>
                  <p>{produto.subtitle}</p>
                </div>
                <div className="product-price">
                  <span>R$ {produto.price}</span>
                  <small>/ mês</small>
                </div>
              </div>
            ) : (
               <p>Não foi possível carregar as informações do produto.</p>
            )}
             
            <div className="total-info">
              <strong>Total Mensal:</strong>
              <strong>R$ {produto?.price || '0,00'}</strong>
            </div>
          </div>

          <div className="confirmation-area">
            {/* Mensagem de erro (se houver) */}
            {error && <p className="processing-error">{error}</p>}

            {/* Mensagem se JÁ POSSUI a assinatura */}
            {hasSubscription === true && (
              <div className="subscription-warning">
                <ShieldAlert size={18} />
                <p>Você já possui uma assinatura ativa deste produto.</p>
                <Link to="/dashboard/servicos" className="btn btn-secondary" style={{width: '100%'}}>
                  Ver Meus Serviços
                </Link>
              </div>
            )}

            {/* Mostra o botão de pagamento apenas se NÃO TIVER a assinatura */}
            {hasSubscription === false && (
              <>
                <h2>Pronto para começar?</h2>
                <p>Você será redirecionado para um ambiente de pagamento seguro (ex: Mercado Pago) para finalizar a compra.</p>
                <p>Ao clicar em "Ir para Pagamento", você concorda com nossos <Link to="/termos" target="_blank">Termos de Serviço</Link>.</p>
                
                <button
                  className="btn btn-primary-dark btn-confirm"
                  onClick={handleGoToPayment}
                  disabled={isProcessing || !produto || !user || hasSubscription === true} // Desabilita se já tem
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> A criar link de pagamento...
                    </>
                  ) : (
                    <>
                      <CreditCard size={18} /> Ir para Pagamento
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

