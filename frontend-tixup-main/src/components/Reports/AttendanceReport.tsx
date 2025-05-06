import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AttendanceReportProps {
  minimal?: boolean;
}

const checkInData = [
  { time: '9-10h', checkIns: 12 },
  { time: '10-11h', checkIns: 24 },
  { time: '11-12h', checkIns: 35 },
  { time: '12-13h', checkIns: 18 },
  { time: '13-14h', checkIns: 8 },
];

const eventsAttendanceData = [
  {
    name: 'Workshop de Design',
    percentage: 93,
    total: 42,
    capacity: 45
  },
  {
    name: 'Conferência Tech',
    percentage: 81,
    total: 97,
    capacity: 120
  },
  {
    name: 'Show de Jazz',
    percentage: 92,
    total: 78,
    capacity: 85
  },
  {
    name: 'Stand Up Comedy',
    percentage: 92,
    total: 60,
    capacity: 65
  },
];

const AttendanceReport: React.FC<AttendanceReportProps> = ({ minimal = false }) => {
  if (minimal) {
    return (
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={checkInData}>
            <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#6b7280" />
            <YAxis hide={true} />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
              }}
              labelStyle={{ color: '#1f2937' }}
            />
            <Bar dataKey="checkIns" fill="#FF7A00" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard 
          title="Total de check-ins"
          value="277"
          change="+32"
          positive={true}
        />
        <MetricCard 
          title="Taxa de presença média"
          value="88%"
          change="+2%"
          positive={true}
        />
        <MetricCard 
          title="Check-ins antecipados"
          value="68"
          change="+15"
          positive={true}
        />
        <MetricCard 
          title="No-shows"
          value="38"
          change="-5"
          positive={true}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Check-ins por Horário</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={checkInData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} stroke="#6b7280" />
                <YAxis axisLine={false} tickLine={false} stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Bar dataKey="checkIns" fill="#FF7A00" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Taxa de Presença por Evento</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={eventsAttendanceData}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} unit="%" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={150} stroke="#6b7280" />
                <Tooltip 
                  formatter={(value, name, props) => {
                    const { payload } = props;
                    return [`${payload.total}/${payload.capacity} (${value}%)`, 'Taxa de presença'];
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                  }}
                  labelStyle={{ color: '#1f2937' }}
                />
                <Bar 
                  dataKey="percentage" 
                  fill="#FF7A00"
                >
                  {eventsAttendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.percentage >= 90 ? '#10B981' : '#FF7A00'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-100">Detalhes de Check-in por Evento</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Evento</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Capacidade</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ingressos vendidos</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check-ins</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Taxa de presença</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Workshop de Design</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">12/04/2025</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">45</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">45</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">42</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">93%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Conferência Tech</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">23/03/2025</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">150</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">120</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">97</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">81%</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Show de Jazz</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">05/04/2025</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">100</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">85</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">78</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">92%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">Stand Up Comedy</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">18/04/2025</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">80</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">65</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">60</td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">92%</td>
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

export default AttendanceReport;