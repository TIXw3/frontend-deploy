import React, { useState } from 'react';
import { Calendar, Download, Filter, RefreshCw, ChevronDown, Check } from 'lucide-react';
import ReportCard from '../../reports/ReportCard';
import EventPerformanceReport from '../../reports/EventPerformanceReport';
import FinancialReport from '../../reports/FinancialReport';
import AttendanceReport from '../../reports/AttendanceReport';
import AudienceReport from '../../reports/AudienceReport';
import DateRangePicker from '../../components/ui/forms/DateRangePicker';
import { exportToPDF, exportToExcel, exportToCSV } from '../../shared/utils/exportUtils';

type ReportType = 'all' | 'financial' | 'audience' | 'attendance' | 'performance';
type DateRange = 'today' | '7days' | '30days' | '90days' | 'year' | 'custom';

// Definições de tipos para cada formato de relatório:
interface PerformanceData {
  name: string;
  tickets: number;
  attendance: number;
  revenue: number;
}

interface FinancialData {
  category: string;
  value: number;
  tickets: number;
  revenue: number;
}

interface AttendanceData {
  time: string;
  checkIns: number;
}

interface AudienceData {
  age: string;
  percentage: number;
}

interface OverviewData {
  category: string;
  events?: number;
  revenue?: number;
  transactions?: number;
  avgTicket?: number;
  total?: number;
  rate?: string;
  visitors?: number;
  newUsers?: number;
}

// Tipo genérico englobando todos os formatos possíveis:
type ReportItem =
  | PerformanceData
  | FinancialData
  | AttendanceData
  | AudienceData
  | OverviewData;

interface ReportResult {
  title: string;
  data: ReportItem[];
}

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('all');
  const [selectedEvent] = useState<string>('all');
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
      case 'today':
        return 'Hoje';
      case '7days':
        return 'Últimos 7 dias';
      case '30days':
        return 'Últimos 30 dias';
      case '90days':
        return 'Últimos 90 dias';
      case 'year':
        return 'Este ano';
      case 'custom':
        return 'Período personalizado';
    }
  };

  const getReportData = (): ReportResult => {
    let title = '';
    let data: ReportItem[] = [];

    switch (activeReport) {
      case 'performance':
        title = 'Desempenho dos Eventos';
        data = [
          { name: 'Workshop de Design', tickets: 45, attendance: 42, revenue: 2250 },
          { name: 'Conferência Tech', tickets: 120, attendance: 97, revenue: 8400 },
          { name: 'Show de Jazz', tickets: 85, attendance: 78, revenue: 5100 },
          { name: 'Stand Up Comedy', tickets: 65, attendance: 60, revenue: 3250 },
        ] as PerformanceData[];
        break;

      case 'financial':
        title = 'Relatório Financeiro';
        data = [
          { category: 'Show', value: 80, tickets: 112, revenue: 8960 },
          { category: 'Festival', value: 120, tickets: 58, revenue: 6960 },
          { category: 'Workshop', value: 45, tickets: 62, revenue: 2790 },
          { category: 'Stand Up', value: 35, tickets: 8, revenue: 290 },
        ] as FinancialData[];
        break;

      case 'attendance':
        title = 'Relatório de Presença';
        data = [
          { time: '9-10h', checkIns: 12 },
          { time: '10-11h', checkIns: 24 },
          { time: '11-12h', checkIns: 35 },
          { time: '12-13h', checkIns: 18 },
          { time: '13-14h', checkIns: 8 },
        ] as AttendanceData[];
        break;

      case 'audience':
        title = 'Relatório de Audiência';
        data = [
          { age: '18-24', percentage: 32 },
          { age: '25-34', percentage: 45 },
          { age: '35-44', percentage: 18 },
          { age: '45+', percentage: 5 },
        ] as AudienceData[];
        break;

      default:
        title = 'Relatório Completo';
        data = [
          { category: 'Performance', events: 4, revenue: 19000 },
          { category: 'Financeiro', transactions: 315, avgTicket: 60.32 },
          { category: 'Presença', total: 277, rate: '88%' },
          { category: 'Audiência', visitors: 5280, newUsers: 168 },
        ] as OverviewData[];
    }

    return { title, data };
  };

  
//Tive que atualizar essa função, estava com erro de compatibilidade
const handleExport = (format: 'PDF' | 'Excel' | 'CSV') => {
  const { title, data } = getReportData();
  const formattedData = data.map((item) => ({ ...item })) as Record<string, unknown>[];

  switch (format) {
    case 'PDF':
      exportToPDF({ title, data: formattedData });
      break;
    case 'Excel':
      exportToExcel({ title, data: formattedData });
      break;
    case 'CSV':
      exportToCSV({ title, data: formattedData });
      break;
  }

  setExportMenuOpen(false);
};
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Relatórios</h1>
        <p className="text-sm sm:text-base text-gray-600">Visualize e exporte dados detalhados sobre seus eventos</p>
      </div>
      
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative inline-block w-full sm:w-auto">
          <button 
            className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md border flex items-center gap-2 ${
              dateRange === 'custom' && isDatePickerOpen ? 'border-orange-400 bg-orange-50' : 'border-gray-300 bg-white'
            }`}
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
          >
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm">{getDateRangeLabel()}</span>
            <ChevronDown size={16} className="text-gray-500 ml-auto" />
          </button>
          
          {isDatePickerOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 w-full sm:w-80">
              <div className="p-3 border-b border-gray-100">
                <h3 className="font-medium text-sm text-gray-700">Selecione o período</h3>
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
                <div className="p-3 border-t border-gray-100">
                  <DateRangePicker 
                    startDate={selectedDates.start}
                    endDate={selectedDates.end}
                    onRangeChange={(start, end) => setSelectedDates({ start, end })}
                  />
                  <div className="flex justify-end mt-3 gap-2">
                    <button 
                      className="px-3 py-1.5 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50"
                      onClick={() => setIsDatePickerOpen(false)}
                    >
                      Cancelar
                    </button>
                    <button 
                      className="px-3 py-1.5 text-sm bg-[#FF7A00] rounded-md text-white hover:bg-orange-600"
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
        
        <div className="relative inline-block w-full sm:w-auto">
          <button className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md border border-gray-300 bg-white flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm">{selectedEvent === 'all' ? 'Todos os eventos' : 'Evento selecionado'}</span>
            <ChevronDown size={16} className="text-gray-500 ml-auto sm:ml-2" />
          </button>
        </div>
        
        <div className="flex-1 hidden sm:block"></div>
        
        <div className="flex gap-2 sm:gap-3">
          <div className="relative inline-block flex-1 sm:flex-none">
            <button 
              className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded-md border border-gray-300 bg-white flex items-center gap-2"
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
            >
              <Download size={16} className="text-gray-500" />
              <span className="text-sm">Exportar relatório</span>
              <ChevronDown size={16} className="text-gray-500 ml-auto sm:ml-2" />
            </button>
            
            {exportMenuOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 w-48">
                <div className="py-1">
                  <ExportOption label="PDF" onClick={() => handleExport('PDF')} />
                  <ExportOption label="Excel" onClick={() => handleExport('Excel')} />
                  <ExportOption label="CSV" onClick={() => handleExport('CSV')} />
                </div>
              </div>
            )}
          </div>
          
          <button className="w-10 h-10 rounded-md border border-gray-300 bg-white flex items-center justify-center flex-shrink-0">
            <RefreshCw size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex whitespace-nowrap">
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
        
        <div className="p-4 sm:p-6">
          {activeReport === 'all' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
        selected ? 'bg-orange-50 text-[#FF7A00]' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
      {selected && <Check size={16} className="text-[#FF7A00]" />}
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
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
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
      className={`px-4 sm:px-5 py-3 text-sm font-medium transition-colors ${
        active 
          ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ReportsPage;