import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConversionChartProps {
  data: Array<{ date: string; conversion: number }>;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  darkMode: boolean;
}

const ConversionChart: React.FC<ConversionChartProps> = ({
  data,
  selectedPeriod,
  onPeriodChange,
  darkMode,
}) => {
  return (
    <div
      className={`lg:col-span-2 rounded-lg border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } p-4 sm:p-5`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-5">
        <h2 className="font-medium text-base sm:text-lg text-gray-800 dark:text-gray-100">
          Taxa de Conversão
        </h2>
        <select
          className={`text-sm sm:text-base border ${
            darkMode
              ? 'border-gray-600 bg-gray-700 text-gray-100'
              : 'border-gray-300 bg-white text-gray-800'
          } rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
        >
          <option value="7days">Últimos 7 dias</option>
          <option value="30days">Últimos 30 dias</option>
          <option value="90days">Últimos 90 dias</option>
        </select>
      </div>
      <div className="h-[220px] sm:h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={darkMode ? '#4b5563' : '#e5e7eb'}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              stroke={darkMode ? '#9ca3af' : '#6b7280'}
              tick={{ fontSize: 12 }}
              width={40}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Taxa de conversão']}
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
                borderRadius: '0.375rem',
                fontSize: '12px',
              }}
              labelStyle={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}
            />
            <Line
              type="monotone"
              dataKey="conversion"
              stroke="#FF7A00"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionChart;