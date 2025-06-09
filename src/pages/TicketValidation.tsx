import { QRCodeSVG } from 'qrcode.react';
import { Calendar, Clock, MapPin, User, Shield, CheckCircle } from 'lucide-react';

interface TicketData {
  id: string;
  eventName: string;
  date: string;
  time: string;
  location: string;
  ticketType: string;
  userName: string;
  userEmail: string;
  price: string;
  status: 'valid' | 'used' | 'expired';
}

const TicketValidation = () => {
  // Backend
  const ticketData: TicketData = {
    id: "TIX-2024-03-15-001",
    eventName: "Festival de Música Eletrônica 2024",
    date: "15 de Junho, 2024",
    time: "19:00",
    location: "Parque de Exposições, São Paulo - SP",
    ticketType: "VIP",
    userName: "João Silva",
    userEmail: "joao.silva@email.com",
    price: "R$ 250,00",
    status: 'valid'
  };

  const qrCodeData = JSON.stringify({
    ticketId: ticketData.id,
    eventName: ticketData.eventName,
    userName: ticketData.userName,
    userEmail: ticketData.userEmail,
    timestamp: new Date().toISOString()
  });

  const getStatusColor = (status: TicketData['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'used':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'expired':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusText = (status: TicketData['status']) => {
    switch (status) {
      case 'valid':
        return 'Válido';
      case 'used':
        return 'Utilizado';
      case 'expired':
        return 'Expirado';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="bg-orange-500 p-6 text-white">
            <h1 className="text-2xl font-bold text-center">Ingresso Digital</h1>
            <p className="text-center mt-2 text-orange-100 dark:text-orange-200">
              Apresente este QR Code na entrada do evento
            </p>
          </div>

          {/* QR Code Section */}
          <div className="flex justify-center p-8 bg-white dark:bg-gray-800">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <QRCodeSVG
                value={qrCodeData}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          {/* Ticket Status */}
          <div className="px-6 py-4 flex justify-center">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(ticketData.status)}`}>
              <CheckCircle size={16} />
              {getStatusText(ticketData.status)}
            </span>
          </div>

          {/* Ticket Details */}
          <div className="p-6 space-y-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{ticketData.eventName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400 dark:text-gray-500" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">{ticketData.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-gray-400 dark:text-gray-500" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">{ticketData.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-400 dark:text-gray-500" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">{ticketData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="text-gray-400 dark:text-gray-500" size={20} />
                  <span className="text-gray-600 dark:text-gray-400">{ticketData.ticketType}</span>
                </div>
              </div>
            </div>

            {/* User Information */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Informações do Titular</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="text-gray-400 dark:text-gray-500" size={20} />
                  <div>
                    <p className="text-gray-800 dark:text-gray-100">{ticketData.userName}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{ticketData.userEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket ID and Price */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Código do Ingresso: {ticketData.id}
              </div>
              <div className="text-lg font-semibold text-orange-500">
                {ticketData.price}
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <Shield className="text-gray-400 dark:text-gray-500 flex-shrink-0" size={20} />
              <p>
                Este ingresso é pessoal e intransferível. A entrada no evento está sujeita à
                apresentação de documento de identificação do titular.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketValidation;