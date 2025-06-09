import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

interface ExportData {
  title: string;
  data: Record<string, unknown>[];
}

export const exportToPDF = (data: ExportData) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(data.title, 20, 20);
  
  // Add data
  doc.setFontSize(12);
  let y = 40;
  
  data.data.forEach((item: Record<string, unknown>) => {
    const text = typeof item === 'object' ? JSON.stringify(item) : String(item);
    doc.text(text, 20, y);
    y += 10;
  });
  
  // Download the PDF
  doc.save(`${data.title.toLowerCase().replace(/\s+/g, '_')}.pdf`);
};

export const exportToExcel = (data: ExportData) => {
  const ws = XLSX.utils.json_to_sheet(data.data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Report');
  
  // Download the Excel file
  XLSX.writeFile(wb, `${data.title.toLowerCase().replace(/\s+/g, '_')}.xlsx`);
};

export const exportToCSV = (data: ExportData) => {
  const ws = XLSX.utils.json_to_sheet(data.data);
  const csv = XLSX.utils.sheet_to_csv(ws);
  
  // Create a Blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${data.title.toLowerCase().replace(/\s+/g, '_')}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};