// src/pages/ProdutoDetalhePage.jsx (Novo Layout, Cores e FAQ)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Adiciona AnimatePresence
import { CheckCircle, PlayCircle, Image, ArrowLeft, Loader2, AlertTriangle, Plus, Minus } from 'lucide-react'; // Adiciona Plus/Minus

import '../components/Design/ProdutoDetalhePage.css'; // CSS Atualizado
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// --- Componente FAQ Item ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Variantes para animação do conteúdo
  const contentVariants = {
    collapsed: { height: 0, opacity: 0, marginTop: 0 },
    open: { height: 'auto', opacity: 1, marginTop: '1rem' }
  };

  return (
    <motion.div className="faq-item" layout> {/* layout anima mudanças de tamanho/posição */}
      <motion.button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: 'var(--color-background-light)' }} // Efeito hover
        transition={{ duration: 0.2 }}
        layout // Anima o botão também
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }} // Rotaciona o ícone
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer"
            variants={contentVariants}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }} // Necessário para animação de altura
            layout // Anima o conteúdo
          >
            {/* Permite renderizar HTML simples na resposta, se necessário */}
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// --- FIM Componente FAQ Item ---


const ProdutoDetalhePage = () => {
  const { produtoId } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Exemplo de dados para FAQ (Idealmente viriam do Firestore também, talvez num campo 'faq' no documento do produto)
  const faqData = [
    { question: "O que está incluído neste plano?", answer: "Este plano inclui gestão de B.O.s, perfis de utilizador (até 50), sistema de anúncios e suporte básico via ticket." },
    { question: "Posso fazer upgrade mais tarde?", answer: "Sim, você pode fazer upgrade para um plano superior a qualquer momento através do seu painel de cliente." },
    { question: "Como funciona a hospedagem?", answer: "Para os planos que incluem hospedagem, nós cuidamos de toda a infraestrutura para que o seu portal SGP-RP fique online. Você recebe um subdomínio ou pode configurar o seu próprio domínio." },
    { question: "O suporte está disponível 24/7?", answer: "O suporte dedicado 24/7 está incluído no Plano Premium. Os outros planos oferecem suporte via ticket ou Discord com tempos de resposta variáveis." }
  ];

  useEffect(() => {
    const fetchProduto = async () => {
       if (!produtoId) {
        setError('ID do produto não fornecido.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const docRef = doc(db, "produtos", produtoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedProduto = { id: docSnap.id, ...docSnap.data() };
          setProduto(fetchedProduto);
          // Define a primeira mídia como selecionada
          // Garante que 'media' existe e é um array antes de tentar aceder
          if (fetchedProduto.media && Array.isArray(fetchedProduto.media) && fetchedProduto.media.length > 0) {
            setSelectedMedia(fetchedProduto.media[0]);
          } else {
            // Define um placeholder se não houver mídia
             setSelectedMedia({ type: 'image', url: 'https://placehold.co/600x400/1D1D1D/70688F?text=Sem+Imagem' });
          }
        } else {
          setError('Produto não encontrado.');
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError('Erro ao carregar o produto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [produtoId]);


  // --- VARIANTES DE ANIMAÇÃO ---
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };
   const faqSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } }, // Adiciona um pequeno delay
  };
  // --- FIM DAS ANIMAÇÕES ---


  // --- RENDERIZAÇÃO CONDICIONAL (Loading/Erro) ---
  if (loading) {
      return (
      <div className="produto-detalhe-wrapper section-padding loading-state">
        <Loader2 className="animate-spin" size={48} />
        <p>A carregar detalhes do produto...</p>
      </div>
    );
  }
  if (error) {
      return (
      <div className="produto-detalhe-wrapper section-padding error-state">
        <AlertTriangle size={48} color="var(--color-danger)" />
        <h2>Erro ao Carregar</h2>
        <p>{error}</p>
        <Link to="/planos" className="btn btn-secondary">
          <ArrowLeft size={18} /> Voltar aos Planos
        </Link>
      </div>
    );
  }
  if (!produto) {
       return (
      <div className="produto-detalhe-wrapper section-padding error-state">
        <AlertTriangle size={48} color="#f59e0b" />
        <h2>Produto Indisponível</h2>
        <p>Não foi possível encontrar informações sobre este produto.</p>
        <Link to="/planos" className="btn btn-secondary">
          <ArrowLeft size={18} /> Voltar aos Planos
        </Link>
      </div>
    );
  }
 // --- FIM DA RENDERIZAÇÃO CONDICIONAL ---


  return (
    <motion.div
        className="produto-detalhe-wrapper section-padding"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
    >
      <div className="container">

        {/* Link de voltar */}
        <motion.div variants={itemVariants}>
          <Link to="/planos" className="back-to-plans-link">
            <ArrowLeft size={16} /> Voltar para Planos
          </Link>
        </motion.div>

        {/* Grid Principal (Layout Novo) */}
        <motion.div
            className="detalhe-grid-novo"
            variants={gridVariants}
        >
            {/* Coluna Esquerda: Mídia e Título */}
            <motion.div className="coluna-esquerda" variants={itemVariants}>
                {/* Mídia */}
                <motion.div className="media-container" variants={itemVariants}>
                    <div className="media-viewer">
                         {/* Garante que selectedMedia existe antes de aceder 'type' */}
                        {selectedMedia?.type === 'youtube' ? (
                        <iframe
                            // Garante que selectedMedia.id existe
                            src={`https://www.youtube.com/embed/${selectedMedia.id}?autoplay=0&modestbranding=1&rel=0`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Vídeo do Produto"
                        ></iframe>
                        ) : (
                        <img
                            // Garante que selectedMedia.url existe ou usa placeholder
                            src={selectedMedia?.url || 'https://placehold.co/600x400/1D1D1D/70688F?text=Sem+Imagem'}
                            alt="Preview do Produto"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1D1D1D/f87171?text=Erro'; }}
                        />
                        )}
                    </div>
                    {/* Thumbnails */}
                    {/* Verifica se produto.media é um array e tem mais de 1 item */}
                    {Array.isArray(produto.media) && produto.media.length > 1 && (
                        <div className="media-thumbnail-list">
                        {produto.media.map((media, index) => (
                            <button
                            key={index}
                             // Verifica se selectedMedia existe antes de comparar
                            className={`thumbnail-item ${selectedMedia && selectedMedia === media ? 'active' : ''}`}
                            onClick={() => setSelectedMedia(media)}
                            >
                            <img
                                src={media.type === 'image' ? media.url : `https://img.youtube.com/vi/${media.id}/mqdefault.jpg`}
                                alt={`Thumbnail ${index + 1}`}
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x90/1D1D1D/f87171?text=Erro'; }}
                            />
                            <div className="thumbnail-icon">
                                {media.type === 'youtube' ? <PlayCircle size={20} /> : <Image size={18} />}
                            </div>
                            </button>
                        ))}
                        </div>
                    )}
                </motion.div>

                {/* Título e Subtítulo (Abaixo da Mídia) */}
                <motion.div className="titulo-produto-abaixo" variants={itemVariants}>
                    <h1>{produto.name}</h1>
                    <p>{produto.subtitle}</p>
                </motion.div>
            </motion.div>

            {/* Coluna Direita: Descrição, Preço, Botão */}
            <motion.div className="coluna-direita" variants={itemVariants}>
                {/* Descrição / Recursos */}
                <motion.div className="detalhe-descricao" variants={itemVariants}>
                    <h3>Recursos incluídos:</h3>
                    <ul className="detalhe-features-list">
                       {/* Verifica se produto.features é um array antes de mapear */}
                        {Array.isArray(produto.features) && produto.features.map((feature) => (
                        <li key={feature}>
                            <CheckCircle size={16} />
                            <span>{feature}</span>
                        </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Preço */}
                <motion.div className="detalhe-price" variants={itemVariants}>
                    <span className="price-amount">R$ {produto.price}</span>
                    <span className="price-period"> / por mês</span>
                </motion.div>

                {/* Botão de Assinar */}
                <motion.div variants={itemVariants}>
                    <Link to={`/checkout/${produto.id}`} className="btn btn-primary-dark btn-assinar">
                        Assinar Agora
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>


        {/* Secção FAQ */}
        <motion.div
            className="faq-section"
            variants={faqSectionVariants}
        >
          <h2>Perguntas Frequentes</h2>
          <div className="faq-list">
             {/* Verifica se faqData é um array antes de mapear */}
            {Array.isArray(faqData) && faqData.map((item, index) => (
              <FaqItem key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ProdutoDetalhePage;

