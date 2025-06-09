import React, { useState } from 'react';
import { Eye, ShoppingCart, Ticket, TrendingUp, ShoppingBag } from 'lucide-react';
import MetricCard from './MetricCard';
import ConversionChart from './ConversionChart';
import EventHighlight from './EventHighlight';
import CampaignsTable from './CampaignsTable';
import LeadsList from './LeadsList';
import { conversionData, campaigns, leads } from './mockData';

interface RemarketingProps {
  darkMode: boolean;
}

const Remarketing: React.FC<RemarketingProps> = ({ darkMode }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedEvent, setSelectedEvent] = useState('all');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-700'} px-4 py-6 sm:px-6 md:px-8 max-w-7xl mx-auto`}>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Remarketing</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Acompanhe sua taxa de conversão e recupere possíveis clientes com campanhas inteligentes.
        </p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <MetricCard
          icon={<Eye className="text-orange-500" size={20} />}
          label="Visitantes"
          value="5,280"
          change={12}
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<ShoppingCart className="text-orange-500" size={20} />}
          label='Cliques em "Comprar"'
          value="2,154"
          change={8}
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<Ticket className="text-orange-500" size={20} />}
          label="Ingressos Vendidos"
          value="864"
          change={15}
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<TrendingUp className="text-orange-500" size={20} />}
          label="Taxa de Conversão"
          value="16.4%"
          change={5}
          positive={true}
          darkMode={darkMode}
        />
        <MetricCard
          icon={<ShoppingBag className="text-orange-500" size={20} />}
          label="Carrinhos Abandonados"
          value="328"
          change={5}
          positive={false}
          darkMode={darkMode}
        />
      </div>

      {/* Gráfico de conversão e destaque de evento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <ConversionChart
          data={conversionData}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          darkMode={darkMode}
        />
        <EventHighlight darkMode={darkMode} />
      </div>

      {/* Campanhas inteligentes */}
      <CampaignsTable campaigns={campaigns} darkMode={darkMode} />

      {/* Leads não convertidos */}
      <LeadsList
        leads={leads}
        selectedEvent={selectedEvent}
        onEventChange={setSelectedEvent}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Remarketing;