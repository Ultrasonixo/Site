import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  Mail,
  Star,
} from "lucide-react";
import { animate, stagger, inView } from "@motionone/dom";
import ParallaxText from "../components/ParallaxText";

import "../components/Design/HomePage.css";
import "../components/Design/PlanosPage.css";

const HomePage = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Gestão Policial Completa",
      description:
        "Gerencie B.O.s, perfis, histórico, promoções e mais de forma simples e segura.",
    },
    {
      icon: BarChart3,
      title: "Relatórios e Inteligência",
      description:
        "Visualize estatísticas, mapas de calor e tendências em tempo real.",
    },
    {
      icon: Users,
      title: "Administração RH Simplificada",
      description:
        "Controle alistamentos, permissões e anúncios em um só painel.",
    },
    {
      icon: Zap,
      title: "Performance e Segurança",
      description:
        "Sistema otimizado e protegido com autenticação JWT e verificação reCAPTCHA.",
    },
    {
      icon: CheckCircle,
      title: "Hospedagem Inclusa",
      description: "Planos com domínio e hospedagem — tudo pronto para usar.",
    },
    {
      icon: Mail,
      title: "Suporte Dedicado",
      description:
        "Equipe sempre disponível para te ajudar a configurar e gerenciar o sistema.",
    },
  ];

  const testimonials = [
    {
      rating: 5,
      text: '"A proteção da Vertex revolucionou meu negócio. Agora posso vender scripts com total segurança, sem medo de cópias."',
      author: "Caio Developer",
      company: "Cliente desde 2025",
    },
    {
      rating: 5,
      text: '"O sistema de vendas automáticas é incrível. Aumentei meu faturamento em mais de 200% desde que comecei a usar."',
      author: "Consolação Paulista",
      company: "Cliente desde 2022",
      logoUrl: "/pp11.png",
    },
    {
      rating: 5,
      text: '"O suporte da Vertex é incomparável. Sempre rápidos e atenciosos!"',
      author: "Roman Store",
      company: "Cliente desde 2023",
    },
  ];

  const trustedLogos = [
    { display: "/pp11.png" },
    { display: "/pp11.png"},
    { display: "/pp11.png"},
    { display: "/pp11.png" },
    { display: "/pp11.png" },
  ];

  useEffect(() => {
    const cleanups = [];

    // --- Animações de entrada ---
    const hero = document.querySelectorAll(".hero-content > *");
    if (hero.length) {
      animate(hero, { opacity: 0, y: -20 }, { duration: 0 });
      animate(hero, { opacity: 1, y: 0 }, { duration: 0.7, delay: stagger(0.15) });
    }

    const animateInView = (selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains("animated")) {
          animate(el, { opacity: 0, y: 30 }, { duration: 0 });
          const stop = inView(
            el,
            () => {
              animate(el, { opacity: 1, y: 0 }, { duration: 0.6 });
              el.classList.add("animated");
            },
            { amount: 0.2 }
          );
          cleanups.push(stop);
        }
      });
    };

    animateInView(".feature-card");
    animateInView(".testimonial-card");

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "#ffbb00" : "var(--color-border)"}
        color={i < rating ? "#ffbb00" : "var(--color-border)"}
        style={{ strokeWidth: 1 }}
      />
    ));

  return (
    <div className="homepage-wrapper">
      {/* HERO */}
      <section className="hero-section section-padding">
        <div className="container hero-content">
          <span className="hero-tag">A plataforma mais completa para Roleplay</span>
          <h1 className="hero-title">
            Portal Policial SGP-RP: Gestão Completa para Sua Comunidade
          </h1>
          <p className="hero-subtitle">
            Organize operações, analise dados e ofereça um portal profissional
            para seus cidadãos e policiais. Hospedagem e atualizações inclusas.
          </p>
          <div className="hero-actions">
            <Link to="/planos" className="btn btn-primary-light">
              Ver Planos e Assinar
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Recursos Poderosos para Sua Gestão</h2>
            <p>
              Tudo o que você precisa para administrar sua corporação e
              interagir com a comunidade de forma eficiente.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <f.icon strokeWidth={1.5} />
                </div>
                <div className="feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX */}
      <section className="parallax-text-section">
        <ParallaxText baseVelocity={-2}>Vertex System • Sites e Bots</ParallaxText>
        <ParallaxText baseVelocity={2}>Qualidade e Performance •</ParallaxText>
      </section>

      {/* TESTEMUNHOS */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Avaliações</span>
            <h2>Clientes Satisfeitos</h2>
            <p>Veja o que nossos clientes dizem sobre nossos serviços.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-rating">{renderStars(t.rating)}</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div>
                    <span className="author-name">{t.author}</span>
                    <span className="author-company">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* LOGO LOOP INFINITO */}
          <div className="trusted-by-section">
            <h3>Empresas que Confiam em Nós</h3>
            <div className="logo-scroller">
              <div className="logo-track">
                {/* sequência duplicada para loop contínuo */}
                {trustedLogos.concat(trustedLogos).map((logo, i) => (
                  <div key={i} className="logo-item">
                    <img src={logo.display} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta-section section-padding">
        <div className="container cta-content">
          <h2 className="cta-title">
            Pronto para Elevar a Gestão da Sua Comunidade RP?
          </h2>
          <p className="cta-subtitle">
            Escolha o plano ideal e comece a usar o SGP-RP hoje mesmo.
          </p>
          <Link to="/planos" className="btn btn-primary-light">
            Ver Planos Agora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
