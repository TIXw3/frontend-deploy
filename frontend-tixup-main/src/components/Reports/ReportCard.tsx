import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ReportCardProps {
  title: string;
  children: ReactNode;
}

const ReportCard: React.FC<ReportCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-gray-100">{title}</h3>
        <button className="text-[#FF7A00] dark:text-[#FF7A00] text-sm flex items-center gap-1 hover:underline">
          Ver detalhes
          <ArrowRight size={14} />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default ReportCard;