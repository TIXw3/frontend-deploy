import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

interface AudienceReportProps {
  minimal?: boolean;
}

const ageDistribution = [
  { name: '18-24', value: 32 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 18 },
  { name: '45+', value: 5 },
];

const genderDistribution = [
  { name: 'Masculino', value: 58 },
  { name: 'Feminino', value: 40 },
  { name: 'Não informado', value: 2 },
];

const COLORS = ['#FF7A00', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const deviceData = [
  { name: 'Mobile', value: 68 },
  { name: 'Desktop', value: 28 },
  { name: 'Tablet', value: 4 },
];

const AudienceReport: React.FC<AudienceReportProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={ageDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: '#6b7280' }}
            >
              {ageDistribution.map((entry, index) => (
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
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total de participantes"
          value="315"
          change="+42"
          positive={true}
        />
        <MetricCard 
          title="Novos compradores"
          value="168"
          change="+23"
          positive={true}
        />
        <MetricCard 
          title="Taxa de retorno"
          value="28%"
          change="+5%"
          positive={true}
        />
        <MetricCard 
          title="Ticket médio"
          value="R$ 60,32"
          change="+R$ 4,18"
          positive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Distribuição por Idade</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#6b7280' }}
                >
                  {ageDistribution.map((entry, index) => (
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Distribuição por Gênero</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#6b7280' }}
                >
                  {genderDistribution.map((entry, index) => (
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Dispositivos</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={deviceData}
                barSize={30}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} unit="%" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} stroke="#6b7280" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Participação']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Bar dataKey="value" fill="#FF7A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">Preferências por Tipo de Evento</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo de Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Participantes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Idade média</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticket médio</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Retorno de compra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Show</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">112</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">26 anos</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 80,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">32%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Festival</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">58</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">24 anos</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 120,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">28%</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Workshop</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">62</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">32 anos</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 45,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">45%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Stand Up</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">8</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">28 anos</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">R$ 35,00</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">18%</td>
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

export default AudienceReport;