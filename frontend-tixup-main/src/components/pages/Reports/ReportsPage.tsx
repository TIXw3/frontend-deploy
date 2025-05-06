import React, { useState } from 'react';
import { Calendar, Download, Filter, RefreshCw, ChevronDown, Check } from 'lucide-react';
import ReportCard from '../../../components/Reports/ReportCard';
import EventPerformanceReport from '../../../components/Reports/EventPerformanceReport';
import FinancialReport from '../../../components/Reports/FinancialReport';
import AttendanceReport from '../../../components/Reports/AttendanceReport';
import AudienceReport from '../../../components/Reports/AudienceReport';
import DateRangePicker from '../../../components/ui/DateRangePicker';

type ReportType = 'all' | 'financial' | 'audience' | 'attendance' | 'performance';
type DateRange = 'today' | '7days' | '30days' | '90days' | 'year' | 'custom';

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>('30days');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState({ start: new Date(), end: new Date() });
  
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
    if (range !== 'custom') {
      setIsDatePickerOpen(false);   
    } else {
      setIsDatePickerOpen(true);
    }
  };
  
  const getDateRangeLabel = () => {
    switch (dateRange) {
      case 'today': return 'Hoje';
      case '7days': return 'Últimos 7 dias';
      case '30days': return 'Últimos 30 dias';
      case '90days': return 'Últimos 90 dias';
      case 'year': return 'Este ano';
      case 'custom': return 'Período personalizado';
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Relatórios</h1>
        <p className="text-gray-600 dark:text-gray-400">Visualize e exporte dados detalhados sobre seus eventos</p>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="relative inline-block">
          <button 
            className={`px-4 py-2 rounded-md border flex items-center gap-2 ${
              dateRange === 'custom' && isDatePickerOpen 
                ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/50 dark:border-orange-500' 
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
            }`}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
            <span className="text-gray-800 dark:text-gray-100">{getDateRangeLabel()}</span>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
          
          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10 w-80">
              <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">Selecione o período</h3>
              </div>
              <div className="p-2">
                <DateRangeOption 
                  label="Hoje" 
                  value="today" 
                  selected={dateRange === 'today'} 
                  onClick={() => handleDateRangeChange('today')}
                />
                <DateRangeOption 
                  label="Últimos 7 dias" 
                  value="7days" 
                  selected={dateRange === '7days'} 
                  onClick={() => handleDateRangeChange('7days')}
                />
                <DateRangeOption 
                  label="Últimos 30 dias" 
                  value="30days" 
                  selected={dateRange === '30days'} 
                  onClick={() => handleDateRangeChange('30days')}
                />
                <DateRangeOption 
                  label="Últimos 90 dias" 
                  value="90days" 
                  selected={dateRange === '90days'} 
                  onClick={() => handleDateRangeChange('90days')}
                />
                <DateRangeOption 
                  label="Este ano" 
                  value="year" 
                  selected={dateRange === 'year'} 
                  onClick={() => handleDateRangeChange('year')}
                />
                <DateRangeOption 
                  label="Período personalizado" 
                  value="custom" 
                  selected={dateRange === 'custom'} 
                  onClick={() => handleDateRangeChange('custom')}
                />
              </div>
              {dateRange === 'custom' && (
                <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                  <DateRangePicker 
                    startDate={selectedDates.start}
                    endDate={selectedDates.end}
                    onRangeChange={(start, end) => setSelectedDates({ start, end })}
                  />
                  <div className="flex justify-end mt-3 gap-2">
                    <button 
                      className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button 
                      className="px-3 py-1.5 text-sm bg-orange-500 rounded-md text-white hover:bg-orange-600 dark:hover:bg-orange-700"
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="relative inline-block">
          <button 
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center gap-2 text-gray-800 dark:text-gray-100"
            onClick={() => setSelectedEvent(selectedEvent === 'all' ? 'selected' : 'all')}
          >
            <Filter size={16} className="text-gray-500 dark:text-gray-400" />
            <span>{selectedEvent === 'all' ? 'Todos os eventos' : 'Evento selecionado'}</span>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1"></div>
        
        <div className="relative inline-block">
          <button 
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center gap-2 text-gray-800 dark:text-gray-100"
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
          >
            <Download size={16} className="text-gray-500 dark:text-gray-400" />
            <span>Exportar relatório</span>
            <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
          
          {exportMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10 w-48">
              <div className="py-1">
                <ExportOption label="PDF" onClick={() => setExportMenuOpen(false)} />
                <ExportOption label="Excel" onClick={() => setExportMenuOpen(false)} />
                <ExportOption label="CSV" onClick={() => setExportMenuOpen(false)} />
              </div>
            </div>
          )}
        </div>
        
        <button className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 flex items-center justify-center">
          <RefreshCw size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <ReportTab 
              label="Todos os relatórios" 
              active={activeReport === 'all'} 
              onClick={() => setActiveReport('all')} 
            />
            <ReportTab 
              label="Desempenho dos eventos" 
              active={activeReport === 'performance'} 
              onClick={() => setActiveReport('performance')} 
            />
            <ReportTab 
              label="Financeiro" 
              active={activeReport === 'financial'} 
              onClick={() => setActiveReport('financial')} 
            />
            <ReportTab 
              label="Presença" 
              active={activeReport === 'attendance'} 
              onClick={() => setActiveReport('attendance')} 
            />
            <ReportTab 
              label="Audiência" 
              active={activeReport === 'audience'} 
              onClick={() => setActiveReport('audience')} 
            />
          </nav>
        </div>
        
        <div className="p-6">
          {activeReport === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportCard title="Desempenho dos eventos">
                <EventPerformanceReport minimal />
              </ReportCard>
              
              <ReportCard title="Relatório financeiro">
                <FinancialReport minimal />
              </ReportCard>
              
              <ReportCard title="Relatório de presença">
                <AttendanceReport minimal />
              </ReportCard>
              
              <ReportCard title="Relatório de audiência">
                <AudienceReport minimal />
              </ReportCard>
            </div>
          )}
          
          {activeReport === 'performance' && <EventPerformanceReport />}
          {activeReport === 'financial' && <FinancialReport />}
          {activeReport === 'attendance' && <AttendanceReport />}
          {activeReport === 'audience' && <AudienceReport />}
        </div>
      </div>
    </div>
  );
};

interface DateRangeOptionProps {
  label: string;
  value: DateRange;
  selected: boolean;
  onClick: () => void;
}

const DateRangeOption: React.FC<DateRangeOptionProps> = ({ label, selected, onClick }) => {
  return (
    <button 
      className={`w-full text-left px-3 py-2 rounded-md flex items-center justify-between text-sm ${
        selected 
          ? 'bg-orange-50 dark:bg-orange-900/50 text-orange-500 dark:text-orange-400' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}
      onClick={onClick}
    >
      {label}
      {selected && <Check size={16} className="text-orange-500 dark:text-orange-400" />}
    </button>
  );
};

interface ExportOptionProps {
  label: string;
  onClick: () => void;
}

const ExportOption: React.FC<ExportOptionProps> = ({ label, onClick }) => {
  return (
    <button 
      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
      onClick={onClick}
    >
      Exportar como {label}
    </button>
  );
};

interface ReportTabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ReportTab: React.FC<ReportTabProps> = ({ label, active, onClick }) => {
  return (
    <button 
      className={`px-5 py-3 text-sm font-medium transition-colors ${
        active 
          ? 'text-orange-500 dark:text-orange-400 border-b-2 border-orange-500 dark:border-orange-400' 
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ReportsPage;