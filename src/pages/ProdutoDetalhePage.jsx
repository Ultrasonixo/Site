// src/pages/ProdutoDetalhePage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// 1. Importa o framer-motion
import { motion } from 'framer-motion'; 
import { CheckCircle, PlayCircle, Image } from 'lucide-react';

// 2. Importa o CSS
import '../components/Design/ProdutoDetalhePage.css';

// --- (Seus dados de exemplo) ---
const todosOsProdutos = [
  { id: 'sgp-basico', name: "Plano Básico SGP-RP", type: 'site', subtitle: "Para pequenas comunidades", price: "29,90", features: ["Gestão de B.O.s", "Gestão de Perfis (até 50)", "Sistema de Anúncios", "Suporte Básico (Ticket)"], media: [ { type: 'youtube', id: 'dQw4w9WgXcQ' }, { type: 'image', url: '/pp11.png' } ] },
  { id: 'sgp-padrao', name: "Plano Padrão SGP-RP", type: 'site', subtitle: "O mais popular", price: "49,90", features: ["Tudo do Básico", "Gestão de Perfis (Ilimitado)", "Relatórios e Estatísticas", "Administração RH Simplificada", "Suporte Prioritário (Discord)"], media: [ { type: 'youtube', id: 'L_LUpnjgPso' }, { type: 'image', url: '/pp11.png' }, { type: 'image', url: '/pp11.png' } ], highlighted: true },
  { id: 'sgp-premium', name: "Plano Premium SGP-RP", type: 'site', subtitle: "Gestão completa", price: "79,90", features: ["Tudo do Padrão", "Gestão de Histórico e Promoções", "Controle de Alistamentos", "Hospedagem Inclusa Premium", "Suporte Dedicado 24/7"], media: [ { type: 'image', url: '/pp11.png' }, { type: 'youtube', id: 'JGwWNGJdvx8' } ] },
];
// --- FIM DOS DADOS ---

const ProdutoDetalhePage = () => {
  const { id } = useParams();
  const produto = todosOsProdutos.find(p => p.id === id);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    if (produto && produto.media && produto.media.length > 0) {
      setSelectedMedia(produto.media[0]);
    }
  }, [produto]);

  // --- 3. AS "MALDITAS" ANIMAÇÕES (AGORA EM CASCATA) ---

  // Animação 1: O Card principal (o container branco)
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1, // Anima filhos (header, grid) em sequência
      },
    },
  };
  
  // Animação 2: O Grid (atrasa as colunas)
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Atraso entre coluna da esquerda e da direita
      },
    },
  };

  // Animação 3: Itens individuais (título, preço, mídia, etc.)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      },
    },
  };
  // --- FIM DAS ANIMAÇÕES ---

  if (!produto) {
     // ... (JSX de produto não encontrado)
  }

  return (
    // O fundo da página (cinza claro)
    <div className="produto-detalhe-wrapper section-padding">
      <div className="container">
        
        {/* Link de voltar (anima separado) */}
        <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Link to="/planos" className="back-to-plans-link">
            &larr; Voltar para Planos
          </Link>
        </motion.div>

        {/* 4. O CARD PRINCIPAL (BRANCO) - Animação 1 aplicada */}
        <motion.div 
          className="detalhe-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Cabeçalho dentro do card */}
          <motion.div className="detalhe-header" variants={itemVariants}>
            <h1 className="detalhe-nome-produto">{produto.name}</h1>
            <span className="detalhe-subtitle">{produto.subtitle}</span>
          </motion.div>

          {/* Grid de 2 colunas - Animação 2 aplicada */}
          <motion.div
            className="detalhe-grid"
            variants={gridVariants}
            // Não precisa de initial/animate aqui, pois o "detalhe-card" já controla
          >
            {/* Coluna da Esquerda (Mídia) */}
            <motion.div className="detalhe-coluna-media" variants={itemVariants}>
              {/* Visualizador Principal */}
              <motion.div className="media-viewer" variants={itemVariants}>
                {selectedMedia?.type === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedMedia.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Vídeo do Produto"
                  ></iframe>
                ) : (
                  <img src={selectedMedia?.url || '/pp11.png'} alt="Preview do Produto" />
                )}
              </motion.div>

              {/* Lista de Thumbnails */}
              <motion.div className="media-thumbnail-list" variants={itemVariants}>
                {produto.media.map((media, index) => (
                  <button
                    key={index}
                    className={`thumbnail-item ${selectedMedia === media ? 'active' : ''}`}
                    onClick={() => setSelectedMedia(media)}
                  >
                    <img src={media.type === 'image' ? media.url : `https://img.youtube.com/vi/${media.id}/0.jpg`} alt={`Thumbnail ${index + 1}`} />
                    <div className="thumbnail-icon">
                      {media.type === 'youtube' ? <PlayCircle size={20} /> : <Image size={18} />}
                    </div>
                  </button>
                ))}
              </motion.div>
            </motion.div>

            {/* Coluna da Direita (Informações) */}
            <motion.div className="detalhe-coluna-info" variants={itemVariants}>
              {/* O info-box agora é só um container simples, não um "card" */}
              <div className="detalhe-info-box">
                
                {/* 5. SUA ORDEM CORRETA: DESCRIÇÃO > PREÇO > BOTÃO */}

                {/* 1. Descrição / Recursos */}
                <motion.div className="detalhe-descricao" variants={itemVariants}>
                  <p>Recursos incluídos no plano:</p>
                  <ul className="detalhe-features-list">
                    {produto.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 2. Preço */}
                <motion.div className="detalhe-price" variants={itemVariants}>
                  <span className="price-amount">R$ {produto.price}</span>
                  <span className="price-period"> / por mês</span>
                </motion.div>

                {/* 3. Botão de Assinar */}
                <motion.div variants={itemVariants}>
                  <Link to={`/checkout/${produto.id}`} className="btn btn-primary-dark btn-assinar">
                    Assinar Agora
                  </Link>
                </motion.div>
                
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default ProdutoDetalhePage;