// src/data/produtos.js

// Movemos os dados para aqui para que possam ser partilhados
// entre a PlanosPage e a ProdutoDetalhePage.

export const todosOsProdutos = [
  {
    id: "sgp-basico",
    name: "Plano Básico SGP-RP",
    type: "site",
    subtitle: "Para pequenas comunidades",
    price: "29,90",
    features: [
      "Gestão de B.O.s",
      "Gestão de Perfis (até 50)",
      "Sistema de Anúncios",
      "Suporte Básico (Ticket)",
    ],
    highlighted: false,
  },
  {
    id: "sgp-padrao",
    name: "Plano Padrão SGP-RP",
    type: "site",
    subtitle: "O mais popular",
    price: "49,90",
    features: [
      "Tudo do Básico",
      "Gestão de Perfis (Ilimitado)",
      "Relatórios e Estatísticas",
      "Administração RH Simplificada",
      "Suporte Prioritário (Discord)",
    ],
    highlighted: true,
  },
  {
    id: "sgp-premium",
    name: "Plano Premium SGP-RP",
    type: "site",
    subtitle: "Gestão completa",
    price: "79,90",
    features: [
      "Tudo do Padrão",
      "Gestão de Histórico e Promoções",
      "Controle de Alistamentos",
      "Hospedagem Inclusa Premium",
      "Suporte Dedicado 24/7",
    ],
    highlighted: false,
  },
  {
    id: "bot-moderacao",
    name: "Bot Moderação Discord",
    type: "bot",
    subtitle: "Moderação Automática",
    price: "19,90",
    features: [
      "Moderação de chat",
      "Sistema de avisos",
      "Logs de atividade",
      "Comandos customizáveis",
    ],
    highlighted: false,
  },
  {
    id: "bot-integracao",
    name: "Bot Integração FiveM",
    type: "bot",
    subtitle: "Conecta Discord e FiveM",
    price: "39,90",
    features: [
      "Whitelist automática",
      "Status do servidor",
      "Chat in-game -> Discord",
      "Suporte Prioritário",
    ],
    highlighted: true,
  },
];