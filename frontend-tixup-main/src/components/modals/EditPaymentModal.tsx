import React, { useState } from "react";
import { X, } from "lucide-react";

interface EditPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paymentData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
    customName?: string;
  }) => void;
}

export function EditPaymentModal({ isOpen, onClose, onSave }: EditPaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [customName, setCustomName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      cardNumber,
      expiryDate,
      cvv,
      cardholderName,
      customName,
    });
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setCardholderName("");
    setCustomName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Adicionar Método de Pagamento</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-2">Nome do Cartão</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Ex.: Cartão Pessoal"
              maxLength={20}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Número do Cartão</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">Data de Expiração</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="MM/AA"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-500 mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="123"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-2">Nome do Titular</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Nome no cartão"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}