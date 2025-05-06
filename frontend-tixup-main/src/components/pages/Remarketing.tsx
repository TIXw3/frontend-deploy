import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ShoppingCart, Ticket, TrendingUp, ShoppingBag, Eye, ArrowUp, ArrowDown, Filter, Download, MessageSquare, Clock, Mail, MoreHorizontal } from 'lucide-react';

const conversionData = [
  { day: 'Seg', rate: 12 },
  { day: 'Ter', rate: 15 },
  { day: 'Qua', rate: 18 },
  { day: 'Qui', rate: 22 },
  { day: 'Sex', rate: 20 },
  { day: 'Sáb', rate: 25 },
  { day: 'Dom', rate: 23 },
];

const campaigns = [
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

const leads = [
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
  },
];

const Remarketing = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedEvent, setSelectedEvent] = useState('all');
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Remarketing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe sua taxa de conversão e recupere possíveis clientes com campanhas inteligentes.
        </p>
      </div>
      
      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <MetricCard
          icon={<Eye className="text-orange-500" size={20} />}
          label="Visitantes"
          value="5,280"
          change={12}
          positive={true}
        />
        <MetricCard
          icon={<ShoppingCart className="text-orange-500" size={20} />}
          label='Cliques em "Comprar"'
          value="2,154"
          change={8}
          positive={true}
        />
        <MetricCard
          icon={<Ticket className="text-orange-500" size={20} />}
          label="Ingressos Vendidos"
          value="864"
          change={15}
          positive={true}
        />
        <MetricCard
          icon={<TrendingUp className="text-orange-500" size={20} />}
          label="Taxa de Conversão"
          value="16.4%"
          change={5}
          positive={true}
        />
        <MetricCard
          icon={<ShoppingBag className="text-orange-500" size={20} />}
          label="Carrinhos Abandonados"
          value="328"
          change={5}
          positive={false}
        />
      </div>
      
      {/* Gráfico de conversão e destaque de evento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800 dark:text-gray-100">Taxa de Conversão</h2>
            <select 
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7days">Últimos 7 dias</option>
              <option value="30days">Últimos 30 dias</option>
              <option value="90days">Últimos 90 dias</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#6b7280" />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  stroke="#6b7280"
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Taxa de conversão']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#FF7A00"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-medium text-gray-800 dark:text-gray-100">Destaque seu Evento</h2>
          </div>
          <div className="p-4">
            <div className="relative rounded-lg overflow-hidden mb-4">
              <img
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
                alt="Festival de Música"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white dark:text-gray-100 font-medium">Festival de Música 2025</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Destaque seu evento para milhares de potenciais compradores na página principal do TixUp.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Visibilidade Premium</span>
                <span className="text-green-600 dark:text-green-400">+250% em média</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Aumento de Vendas</span>
                <span className="text-green-600 dark:text-green-400">+70% em média</span>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-white rounded-md py-2 font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors">
              Destacar meu evento
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              A partir de R$49,90 por dia
            </p>
          </div>
        </div>
      </div>
      
      {/* Campanhas inteligentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-medium text-gray-800 dark:text-gray-100">Campanhas Inteligentes</h2>
          <button className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors flex items-center gap-2">
            <Mail size={16} />
            Criar Automação
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Campanha</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Emails</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Taxa de abertura</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Taxa de clique</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'Ativa'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : campaign.status === 'Pausada'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{campaign.emails}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                          style={{ width: `${campaign.openRate}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{campaign.openRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{ width: `${campaign.clickRate}%` }}
                        />
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{campaign.clickRate}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Leads não convertidos */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="font-medium text-gray-800 dark:text-gray-100">Leads Não Convertidos</h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Filter size={18} />
            </button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Download size={18} />
            </button>
            <select 
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="all">Todos os eventos</option>
              <option value="music">Festival de Música</option>
              <option value="tech">Conferência Tech</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="w-8 px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lead</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fonte</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Última visita</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 text-orange-500 focus:ring-orange-500" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 mr-3">
                        {lead.initial}
                      </div>
                      <span className="text-sm text-gray-900 dark:text-gray-100">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{lead.event}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'Carrinho abandonado'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        : lead.status === 'Apenas visitou'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{lead.source}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {lead.lastVisit}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400">
                        <MessageSquare size={18} />
                      </button>
                      <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>0 de 5 leads selecionados</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Enviar mensagem
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              Exportar CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: number;
  positive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, change, positive }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <div className="flex items-center mt-1">
        {positive ? (
          <ArrowUp size={14} className="text-green-600 dark:text-green-400" />
        ) : (
          <ArrowDown size={14} className="text-red-600 dark:text-red-400" />
        )}
        <span className={`text-xs ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {change}% em relação ao período anterior
        </span>
      </div>
    </div>
  );
};

export default Remarketing;