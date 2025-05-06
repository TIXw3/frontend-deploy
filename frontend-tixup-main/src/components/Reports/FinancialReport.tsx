import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface FinancialReportProps {
  minimal?: boolean;
}

const revenueData = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Fev', revenue: 1800 },
  { month: 'Mar', revenue: 2400 },
  { month: 'Abr', revenue: 3600 },
  { month: 'Mai', revenue: 3000 },
];

const paymentMethodData = [
  { name: 'Cartão de Crédito', value: 68 },
  { name: 'Pix', value: 24 },
  { name: 'Boleto', value: 8 },
];

const COLORS = ['#FF7A00', '#0088FE', '#00C49F', '#FFBB28'];

const FinancialReport: React.FC<FinancialReportProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#6b7280" />
            <YAxis hide={true} />
            <Tooltip 
              formatter={(value) => [`R$ ${value}`, 'Receita']}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
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
          title="Receita total"
          value="R$ 19.000,00"
          change="+R$ 3.450,00"
          positive={true}
        />
        <MetricCard 
          title="Ticket médio"
          value="R$ 60,32"
          change="+R$ 4,18"
          positive={true}
        />
        <MetricCard 
          title="Taxa de conversão"
          value="3,8%"
          change="+0,5%"
          positive={true}
        />
        <MetricCard 
          title="Devoluções"
          value="R$ 620,00"
          change="-R$ 120,00"
          positive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Receita por Período</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#6b7280" />
                <YAxis axisLine={false} tickLine={false} stroke="#6b7280" tickFormatter={(value) => `R$ ${value}`} />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Receita']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
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
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Métodos de Pagamento</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#6b7280' }}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Participação']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">Receita por Categoria de Ingresso</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Categoria</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Valor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ingressos vendidos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Receita total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">% da receita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Show</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 80,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">112</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 8.960,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">47%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Festival</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 120,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">58</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 6.960,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">37%</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Workshop</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 45,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">62</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 2.790,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">15%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Stand Up</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 35,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">8</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 290,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">1%</td>
              </tr>
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

export default FinancialReport;