export const conversionData = [
  { date: 'Seg', conversion: 12 },
  { date: 'Ter', conversion: 15 },
  { date: 'Qua', conversion: 18 },
  { date: 'Qui', conversion: 22 },
  { date: 'Sex', conversion: 20 },
  { date: 'Sáb', conversion: 25 },
  { date: 'Dom', conversion: 23 },
];


export const campaigns = [
  {
    id: 1,
    name: 'Lembrete de carrinho abandonado',
    status: 'Ativa',
    type: 'cart',
    emails: 342,
    openRate: 67,
    clickRate: 22,
  },
  {
    id: 2,
    name: 'Lembrete de evento próximo',
    status: 'Ativa',
    type: 'event',
    emails: 852,
    openRate: 85,
    clickRate: 35,
  },
  {
    id: 3,
    name: 'Retorno de visitantes',
    status: 'Pausada',
    type: 'visitor',
    emails: 128,
    openRate: 42,
    clickRate: 12,
  },
  {
    id: 4,
    name: 'Pesquisa pós-evento',
    status: 'Rascunho',
    type: 'survey',
    emails: 0,
    openRate: 0,
    clickRate: 0,
  },
];

export const leads = [
  {
    id: 1,
    initial: 'M',
    name: 'maria.silva@example.com',
    event: 'Festival de Música 2025',
    status: 'Carrinho abandonado',
    source: 'Instagram',
    lastVisit: '2 horas atrás',
  },
  {
    id: 2,
    initial: 'J',
    name: 'joao.santos@gmail.com',
    event: 'Workshop de Fotografia',
    status: 'Apenas visitou',
    source: 'Google',
    lastVisit: '5 horas atrás',
  },
  {
    id: 3,
    initial: 'A',
    name: 'ana.paula@hotmail.com',
    event: 'Conferência Tech 2025',
    status: 'Cadastrado',
    source: 'Facebook',
    lastVisit: '1 dia atrás',
  },
  {
    id: 4,
    initial: 'C',
    name: 'carlos.oliveira@yahoo.com',
    event: 'Workshop de Culinária',
    status: 'Carrinho abandonado',
    source: 'Email',
    lastVisit: '2 dias atrás',
  },
  {
    id: 5,
    initial: 'R',
    name: 'renata.garcia@gmail.com',
    event: 'Festival de Cinema Independente',
    status: 'Apenas visitou',
    source: 'Direto',
    lastVisit: '2 dias atrás',
  }
];