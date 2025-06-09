import React from 'react';
import { Clock, MessageSquare, MoreHorizontal, Filter, Download } from 'lucide-react';

interface Lead {
  id: number;
  initial: string;
  name: string;
  event: string;
  status: string;
  source: string;
  lastVisit: string;
}

interface LeadsListProps {
  leads: Lead[];
  selectedEvent: string;
  onEventChange: (event: string) => void;
  darkMode: boolean;
}

const LeadsList: React.FC<LeadsListProps> = ({ leads, selectedEvent, onEventChange, darkMode }) => {
  return (
    <div
      className={`rounded-lg border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } overflow-hidden`}
    >
      <div
        className={`p-4 sm:p-5 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0`}
      >
        <h2 className="font-medium text-base sm:text-lg text-gray-800 dark:text-gray-100">
          Leads Não Convertidos
        </h2>
        <div className="flex items-center gap-2">
          <button
            className={`p-1.5 rounded-md ${
              darkMode
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Filter size={18} />
          </button>
          <button
            className={`p-1.5 rounded-md ${
              darkMode
                ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Download size={18} />
          </button>
          <select
            className={`flex-grow sm:flex-grow-0 text-sm sm:text-base border ${
              darkMode
                ? 'border-gray-600 bg-gray-700 text-gray-100'
                : 'border-gray-300 bg-white text-gray-800'
            } rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
            value={selectedEvent}
            onChange={(e) => onEventChange(e.target.value)}
          >
            <option value="all">Todos os eventos</option>
            <option value="music">Festival de Música</option>
            <option value="tech">Conferência Tech</option>
          </select>
        </div>
      </div>

      {/* Mobile leads list (visible on small screens only) */}
      <div className="sm:hidden">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`p-4 border-b ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div
                  className={`w-7 h-7 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  } flex items-center justify-center text-xs font-medium mr-2`}
                >
                  {lead.initial}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {lead.name}
                  </span>
                  <div className="flex items-center mt-1">
                    <Clock size={12} className="text-gray-500 dark:text-gray-400" />
                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                      {lead.lastVisit}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  lead.status === 'Carrinho abandonado'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    : lead.status === 'Apenas visitou'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                }`}
              >
                {lead.status}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="block text-gray-500 dark:text-gray-400">Evento</span>
                <span className="block text-gray-900 dark:text-gray-100">{lead.event}</span>
              </div>
              <div>
                <span className="block text-gray-500 dark:text-gray-400">Fonte</span>
                <span className="block text-gray-900 dark:text-gray-100">{lead.source}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button
                className={`p-1.5 ${
                  darkMode
                    ? 'text-gray-500 hover:text-orange-400'
                    : 'text-gray-400 hover:text-orange-500'
                }`}
              >
                <MessageSquare size={16} />
              </button>
              <button
                className={`p-1.5 ${
                  darkMode
                    ? 'text-gray-500 hover:text-gray-300'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table (hidden on small screens) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <th className="w-8 px-4 py-3">
                <input
                  type="checkbox"
                  className={`rounded border-${
                    darkMode ? 'gray-600' : 'gray-300'
                  } text-orange-500 focus:ring-orange-500`}
                />
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Lead
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Evento
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Status
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Fonte
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Última visita
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className={`rounded border-${
                      darkMode ? 'gray-600' : 'gray-300'
                    } text-orange-500 focus:ring-orange-500`}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      } flex items-center justify-center text-sm font-medium mr-3`}
                    >
                      {lead.initial}
                    </div>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{lead.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{lead.event}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      lead.status === 'Carrinho abandonado'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        : lead.status === 'Apenas visitou'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                    }`}
                  >
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
                    <button
                      className={`${
                        darkMode
                          ? 'text-gray-500 hover:text-orange-400'
                          : 'text-gray-400 hover:text-orange-500'
                      }`}
                    >
                      <MessageSquare size={16} />
                    </button>
                    <button
                      className={`${
                        darkMode
                          ? 'text-gray-500 hover:text-gray-300'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className={`px-4 py-3 ${
          darkMode ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-200'
        } border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0`}
      >
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <span>0 de 5 leads selecionados</span>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          <button
            className={`px-3 py-1.5 text-sm border ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            } rounded-md`}
          >
            Enviar mensagem
          </button>
          <button
            className={`px-3 py-1.5 text-sm border ${
              darkMode
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            } rounded-md`}
          >
            Exportar CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadsList;