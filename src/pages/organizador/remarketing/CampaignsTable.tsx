import React from 'react';
import { Mail, MoreHorizontal } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  status: string;
  type: string;
  emails: number;
  openRate: number;
  clickRate: number;
}

interface CampaignsTableProps {
  campaigns: Campaign[];
  darkMode: boolean;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns, darkMode }) => {
  return (
    <div
      className={`rounded-lg border ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } overflow-hidden mb-6 sm:mb-8`}
    >
      <div
        className={`p-4 sm:p-5 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0`}
      >
        <h2 className="font-medium text-base sm:text-lg text-gray-800 dark:text-gray-100">
          Campanhas Inteligentes
        </h2>
        <button
          className={`bg-orange-500 text-white px-4 py-1.5 rounded-md text-sm sm:text-base font-medium hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto`}
        >
          <Mail size={16} />
          <span>Criar Automação</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Campanha
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
                Emails
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Taxa de abertura
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              >
                Taxa de clique
              </th>
              <th
                className={`px-4 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                } uppercase tracking-wider`}
              ></th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {campaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {campaign.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      campaign.status === 'Ativa'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : campaign.status === 'Pausada'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {campaign.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  {campaign.emails}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div
                      className={`w-24 sm:w-32 h-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      } rounded-full overflow-hidden`}
                    >
                      <div
                        className="h-full bg-green-500 dark:bg-green-400 rounded-full"
                        style={{ width: `${campaign.openRate}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {campaign.openRate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <div
                      className={`w-24 sm:w-32 h-2 ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      } rounded-full overflow-hidden`}
                    >
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${campaign.clickRate}%` }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {campaign.clickRate}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    className={`${
                      darkMode
                        ? 'text-gray-500 hover:text-gray-300'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;