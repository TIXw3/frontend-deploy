import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

interface EventPerformanceReportProps {
  minimal?: boolean;
}

const sampleEventData = [
  { name: 'Workshop de Design', tickets: 45, attendance: 42, revenue: 2250 },
  { name: 'Conferência Tech', tickets: 120, attendance: 97, revenue: 8400 },
  { name: 'Show de Jazz', tickets: 85, attendance: 78, revenue: 5100 },
  { name: 'Stand Up Comedy', tickets: 65, attendance: 60, revenue: 3250 },
];

const ticketSalesData = [
  { month: 'Jan', sales: 28 },
  { month: 'Fev', sales: 45 },
  { month: 'Mar', sales: 58 },
  { month: 'Abr', sales: 82 },
  { month: 'Mai', sales: 47 },
];

const EventPerformanceReport: React.FC<EventPerformanceReportProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ticketSalesData}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#6b7280" />
            <YAxis hide={true} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#FF7A00" 
              strokeWidth={2} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total de eventos"
          value="4"
          change="+1"
          positive={true}
        />
        <MetricCard 
          title="Ingressos vendidos"
          value="315"
          change="+42"
          positive={true}
        />
        <MetricCard 
          title="Taxa de presença"
          value="88%"
          change="+2%"
          positive={true}
        />
        <MetricCard 
          title="Receita total"
          value="R$ 19.000,00"
          change="+R$ 3.450,00"
          positive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Vendas de Tickets</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketSalesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#6b7280" />
                <YAxis axisLine={false} tickLine={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#FF7A00" 
                  strokeWidth={2} 
                  dot={{ r: 4, strokeWidth: 2 }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Comparação de Eventos</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sampleEventData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#6b7280" />
                <YAxis axisLine={false} tickLine={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Legend />
                <Bar dataKey="tickets" name="Ingressos" fill="#FF7A00" />
                <Bar dataKey="attendance" name="Presença" fill="#FFB566" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">Desempenho por Evento</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nome do Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ingressos Vendidos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Presença</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Taxa de Presença</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Receita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sampleEventData.map((event, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{event.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{event.tickets}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{event.attendance}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{Math.round((event.attendance / event.tickets) * 100)}%</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ {event.revenue.toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, positive }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      <p className={`text-xs mt-1 ${positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
        {change} em relação ao período anterior
      </p>
    </div>
  );
};

export default EventPerformanceReport;