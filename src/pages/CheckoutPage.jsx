import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Loader2, AlertTriangle, ArrowLeft, ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';

// Importações Firebase
import { auth, db } from '../firebase.js'; // Apenas para 'auth' e 'db' (para ler o produto)
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Importa CSS
import '../components/Design/CheckoutPage.css';

const CheckoutPage = () => {
  const { produtoId } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState(auth.currentUser);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para o botão de pagamento

  // Observador de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Busca detalhes do produto (Esta parte continua igual)
  useEffect(() => {
    const fetchProduto = async () => {
      if (!produtoId) {
        setError('Nenhum produto selecionado.');
        setLoadingProduct(false);
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
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError('Erro ao carregar detalhes do produto.');
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduto();
  }, [produtoId]);

  // --- FUNÇÃO DE PAGAMENTO ATUALIZADA ---
  // Esta função agora deve contactar o teu backend (Cloud Function)
  // para criar um link de pagamento (ex: Mercado Pago)
  const handleGoToPayment = async () => {
    if (!user) {
      setError('Você precisa estar logado para pagar.');
      return;
    }
    if (!produto) {
      setError('Produto inválido.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // --- LÓGICA REAL (A FAZER) ---
      // 1. Chamar uma Cloud Function do Firebase
      // const response = await suaCloudFunction({ produtoId: produto.id, userId: user.uid });
      // const paymentUrl = response.data.paymentUrl;
      
      // 2. Redirecionar o utilizador para o pagamento
      // window.location.href = paymentUrl;

      // --- SIMULAÇÃO (TEMPORÁRIO) ---
      // Vamos simular que estamos a falar com o backend e a redirecionar
      console.log("Iniciando pagamento para:", produto.id);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simula espera da API
      
      // Se fosse real, a linha abaixo faria o redirecionamento.
      // Por agora, vamos apenas navegar para o dashboard como se tivesse funcionado.
      console.log("Pagamento (simulado) com sucesso! Redirecionando...");
      navigate('/dashboard/servicos?payment=success');

      // NOTA: A lógica de 'addDoc' para criar a 'subscription'
      // foi REMOVIDA daqui. Ela deve agora viver no teu BACKEND (Cloud Function)
      // e só ser executada DEPOIS que o Mercado Pago confirmar o pagamento.

    } catch (err) {
      console.error("Erro ao iniciar pagamento:", err);
      setError('Ocorreu um erro ao processar seu pagamento. Tente novamente.');
      setIsProcessing(false);
    }
  };


  // --- Renderização Condicional ---
   if (!user && !loadingProduct) {
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

  if (loadingProduct) {
    return (
      <div className="checkout-wrapper section-padding loading-state">
        <Loader2 className="animate-spin" size={48} />
        <p>A carregar checkout...</p>
      </div>
    );
  }

  if (error && !produto) {
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
          <Link to={`/produto/${produtoId}`} className="back-link">
            <ArrowLeft size={16} /> Voltar aos Detalhes
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
            <h2>Pronto para começar?</h2>
            <p>Você será redirecionado para um ambiente de pagamento seguro (Mercado Pago) para finalizar a compra.</p>
            <p>Ao clicar em "Ir para Pagamento", você concorda com nossos <Link to="/termos" target="_blank">Termos de Serviço</Link>.</p>
            
            {error && <p className="processing-error">{error}</p>}

            <button
              className="btn btn-primary-dark btn-confirm"
              onClick={handleGoToPayment}
              disabled={isProcessing || !produto || !user}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
