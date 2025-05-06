import React, { useState, useEffect } from "react";
import {
  User,
  Heart,
  Upload,
  LogOut,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  MapPin,
  Edit,
  Ticket,
  AlertCircle,
  X,
} from "lucide-react";
import { EditProfileModal } from "../modals/EditProfileModal";
import { EditPaymentModal } from "../modals/EditPaymentModal";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../types/UserData";
import { EventData } from "../../types/EventData";
interface PaymentMethod {
  id: string;
  last4: string;
  expiryDate: string;
  cardholderName: string;
  brand: string;
  nickname?: string;
  customName?: string;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  customName?: string;
}

interface UserDashboardProps {
  userData: UserData;
  onUpdateProfile: (userData: UserData) => void;
  onLogout: () => void;
  likedEvents: EventData[];
  onLikeToggle: (
    eventoId: string,
    isLiked: boolean,
    eventInfo: Omit<EventData, "id">
  ) => void;
}
const WalletModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddNew: () => void;
  cards: PaymentMethod[];
  onRemove: (id: string) => void;
  onUpdateCustomName: (id: string, customName: string) => void;
}> = ({ isOpen, onClose, onAddNew, cards, onRemove, onUpdateCustomName }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [editingCustomName, setEditingCustomName] = useState<string | null>(
    null
  );
  const [customNameValue, setCustomNameValue] = useState<string>("");

  if (!isOpen) return null;

  const confirmRemove = () => {
    if (showDeleteConfirm) {
      onRemove(showDeleteConfirm);
      setShowDeleteConfirm(null);
      setExpandedCard(null);
    }
  };

  const displayCards = cards.length > 0 ? cards : [];

  const getCardGradient = (brand: string) => {
    switch (brand) {
      case "Visa":
        return "bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-t-lg";
      case "Mastercard":
        return "bg-gradient-to-r from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-t-lg";
      case "Amex":
        return "bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 rounded-t-lg";
      case "Elo":
        return "bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-t-lg";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700 dark:from-gray-600 dark:to-gray-800 rounded-t-lg";
    }
  };

  const toggleCardExpansion = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleCustomNameEdit = (
    id: string,
    currentCustomName: string | undefined
  ) => {
    setEditingCustomName(id);
    setCustomNameValue(currentCustomName || "");
  };

  const handleCustomNameChange = (id: string) => {
    if (customNameValue.trim()) {
      onUpdateCustomName(id, customNameValue.trim().slice(0, 20));
    }
    setEditingCustomName(null);
    setCustomNameValue("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6 w-full max-w-md relative shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              Minha Carteira
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {displayCards.map((card) => (
            <div key={card.id} className="rounded-lg shadow-sm">
              <div
                className={`${getCardGradient(
                  card.brand
                )} flex items-center justify-between p-3 text-white cursor-pointer rounded-lg transition-all duration-200 hover:bg-opacity-80 shadow-sm`}
                onClick={() => toggleCardExpansion(card.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-20">
                    {card.brand === "Visa" && (
                      <span className="text-lg font-bold text-white">VISA</span>
                    )}
                    {card.brand === "Mastercard" && (
                      <span className="text-lg font-bold text-white">MC</span>
                    )}
                    {card.brand === "Amex" && (
                      <span className="text-lg font-bold text-white">AMEX</span>
                    )}
                    {card.brand === "Elo" && (
                      <span className="text-lg font-bold text-white">ELO</span>
                    )}
                    {card.brand === "Desconhecida" && (
                      <CreditCard className="w-6 h-6 text-white" />
                    )}
                  </div>
                  {editingCustomName === card.id ? (
                    <input
                      type="text"
                      value={customNameValue}
                      onChange={(e) => setCustomNameValue(e.target.value)}
                      onBlur={() => handleCustomNameChange(card.id)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCustomNameChange(card.id)
                      }
                      className="text-black dark:text-gray-100 bg-white dark:bg-gray-900 rounded px-2 py-1 text-sm max-w-[150px]"
                      placeholder="Digite o nome"
                      maxLength={20}
                      autoFocus
                    />
                  ) : (
                    <span
                      className="text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomNameEdit(card.id, card.customName);
                      }}
                    >
                      {card.customName || "Cartão sem nome"}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm transition-transform duration-200 ${
                    expandedCard === card.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
              {expandedCard === card.id && (
                <div
                  className={`${getCardGradient(
                    card.brand
                  )} p-4 text-white rounded-b-lg`}
                >
                  <div className="bg-white bg-opacity-20 p-3 rounded-b-lg">
                    <div className="text-base tracking-wider mb-3">
                      **** **** **** {card.last4}
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs opacity-80">Titular</p>
                        <p className="text-sm font-medium">
                          {card.cardholderName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-80">Expira</p>
                        <p className="text-sm font-medium">{card.expiryDate}</p>
                      </div>
                    </div>
                    {card.id !== "0" && (
                      <button
                        onClick={() => setShowDeleteConfirm(card.id)}
                        className="mt-3 px-3 py-1 bg-red-500/20 dark:bg-red-600/20 text-red-200 dark:text-red-300 rounded-lg hover:bg-red-500/30 dark:hover:bg-red-600/30 transition-colors duration-200 text-xs font-medium"
                      >
                        Remover Cartão
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            onClick={onAddNew}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 text-white rounded-lg px-3 py-2 text-sm font-semibold shadow-md hover:from-orange-600 hover:to-orange-700 dark:hover:from-orange-700 dark:hover:to-orange-800 transition-all duration-200"
          >
            + Adicionar Método de Pagamento
          </button>
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Confirmar Remoção
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja remover este cartão?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function UserDashboard({
  userData,
  onUpdateProfile,
  onLogout,
  likedEvents,
  onLikeToggle,
}: UserDashboardProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [newAddress, setNewAddress] = useState(userData.address || "");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<UserData>(userData);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem("paymentMethods");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: "1",
        last4: "1820",
        expiryDate: "02/28",
        cardholderName: "Thiago",
        brand: "Desconhecida",
        nickname: "Cartão Principal",
        customName: "Cartão de Emergência",
      },
      {
        id: "2",
        last4: "5382",
        expiryDate: "02/32",
        cardholderName: "Thiago",
        brand: "Visa",
        nickname: "Cartão de Viagem",
        customName: "Cartão de Compras",
      },
    ];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
  }, [paymentMethods]);

  const detectCardBrand = (cardNumber: string): string => {
    if (/^4/.test(cardNumber)) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "Mastercard";
    if (/^3[47]/.test(cardNumber)) return "Amex";
    if (/^(636368|5067|509|504|63[2-9])/.test(cardNumber)) return "Elo";
    return "Desconhecida";
  };

  const handleUpdateProfile = (newData: UserData) => {
    onUpdateProfile(newData);
    setShowEditProfile(false);
    setEditingField(null);
    setEditValues(newData);
  };

  const handleAddPayment = (paymentData: PaymentData) => {
    const { cardNumber, expiryDate, cardholderName, customName } = paymentData;
    const last4 = cardNumber.replace(/\s/g, "").slice(-4);
    const brand = detectCardBrand(cardNumber.replace(/\s/g, ""));
    const newPayment: PaymentMethod = {
      id: Date.now().toString(),
      last4,
      expiryDate,
      cardholderName,
      brand,
      customName: customName || "",
      nickname: customName || "",
    };
    setPaymentMethods([...paymentMethods, newPayment]);
  };

  const handleRemovePayment = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const handleUpdateCustomName = (id: string, customName: string) => {
    setPaymentMethods((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, customName, nickname: customName } : card
      )
    );
  };

  const confirmRemovePayment = () => {
    if (showDeleteConfirm) {
      setPaymentMethods(
        paymentMethods.filter((payment) => payment.id !== showDeleteConfirm)
      );
      setShowDeleteConfirm(null);
    }
  };

  const cancelRemovePayment = () => {
    setShowDeleteConfirm(null);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({
          ...userData,
          avatarUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAddress = () => {
    onUpdateProfile({ ...userData, address: newAddress });
    setShowEditAddress(false);
  };

  const startEditing = (field: string) => {
    setEditingField(field);
    setEditValues(userData);
  };

  const handleFieldChange = (field: string, value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  const confirmEdit = () => {
    handleUpdateProfile(editValues);
  };

  const toggleLike = (event: EventData) => {
    onLikeToggle(event.id, false, {
      name: event.name,
      image: event.image,
      date: event.date,
      price: event.price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <img
              src={
                userData.avatarUrl ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
              }
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-orange-500 dark:border-orange-400"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-orange-500 dark:bg-orange-600 p-2 rounded-full text-white hover:bg-orange-600 dark:hover:bg-orange-700 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {userData.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            @{userData.name.toLowerCase().replace(/\s/g, "")}
          </p>
          <button
            onClick={onLogout}
            className="mt-2 flex items-center justify-center mx-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair
          </button>
          {userData.tipo === "organizador" ? (
            <button
              onClick={() => navigate("/organizer-dashboard")}
              className="mt-2 flex items-center justify-center mx-auto bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300"
            >
              Ir para Dashboard Organizador
            </button>
          ) : (
            <button
              onClick={() =>
                onUpdateProfile({ ...userData, tipo: "organizador" })
              }
              className="mt-2 flex items-center justify-center mx-auto bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors duration-300"
            >
              Quero ser Organizador
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center border border-orange-500 dark:border-gray-600">
            <User className="w-6 h-6 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">
              Preferências
            </p>
            <button
              onClick={() => navigate("/user-settings")}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500 mt-2 uppercase text-xs font-medium"
            >
              Ver detalhes
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center border border-orange-500 dark:border-gray-600">
            <Ticket className="w-6 h-6 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">
              Meus Ingressos
            </p>
            <button
              onClick={() => navigate("/meus-ingressos")}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500 mt-2 uppercase text-xs font-medium"
            >
              Gerenciar
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center border border-orange-500 dark:border-gray-600">
            <CreditCard className="w-6 h-6 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">
              Meu Saldo
            </p>
            <p className="text-orange-500 dark:text-orange-400 font-medium mt-2">
              R$ 0,00
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 text-center border border-orange-500 dark:border-gray-600">
            <CreditCard className="w-6 h-6 text-orange-500 dark:text-orange-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">
              Meus Cartões
            </p>
            <button
              onClick={() => setShowWallet(true)}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500 mt-2 uppercase text-xs font-medium"
            >
              Gerenciar
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 h-[calc(100vh-300px)]">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 w-full md:w-1/2 sticky top-0 h-fit max-h-[calc(100vh-300px)] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <User className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
              Editar dados da conta
            </h3>
            <div className="space-y-3">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <User className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    Nome
                  </p>
                  {editingField === "name" ? (
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.name}
                    </p>
                  )}
                </div>
                {editingField === "name" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("name")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <Mail className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    E-mail
                  </p>
                  {editingField === "email" ? (
                    <input
                      type="email"
                      value={editValues.email}
                      onChange={(e) =>
                        handleFieldChange("email", e.target.value)
                      }
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.email}
                    </p>
                  )}
                </div>
                {editingField === "email" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("email")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <Phone className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    Telefone
                  </p>
                  {editingField === "phone" ? (
                    <input
                      type="text"
                      value={editValues.phone}
                      onChange={(e) =>
                        handleFieldChange("phone", e.target.value)
                      }
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.phone || "Não informado"}
                    </p>
                  )}
                </div>
                {editingField === "phone" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("phone")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <MapPin className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    Localização
                  </p>
                  {editingField === "address" ? (
                    <input
                      type="text"
                      value={editValues.address}
                      onChange={(e) =>
                        handleFieldChange("address", e.target.value)
                      }
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.address || "Não informado"}
                    </p>
                  )}
                </div>
                {editingField === "address" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("address")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <User className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    CPF
                  </p>
                  {editingField === "cpf" ? (
                    <input
                      type="text"
                      value={editValues.cpf}
                      onChange={(e) => handleFieldChange("cpf", e.target.value)}
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.cpf || "Não informado"}
                    </p>
                  )}
                </div>
                {editingField === "cpf" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("cpf")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <Calendar className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    Data de Nascimento
                  </p>
                  {editingField === "birthDate" ? (
                    <input
                      type="text"
                      value={editValues.birthDate}
                      onChange={(e) =>
                        handleFieldChange("birthDate", e.target.value)
                      }
                      className="w-full p-1 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">
                      {userData.birthDate || "Não informado"}
                    </p>
                  )}
                </div>
                {editingField === "birthDate" ? (
                  <button
                    onClick={confirmEdit}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    Confirmar
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing("birthDate")}
                    className="ml-2 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <CreditCard className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-orange-500 dark:text-orange-400">
                    Métodos de Pagamento
                  </p>
                  {paymentMethods.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                      Nenhum método de pagamento adicionado.
                    </p>
                  ) : (
                    <div className="grid gap-4 mt-2">
                      {paymentMethods.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center">
                              {payment.brand === "Visa" && (
                                <span className="text-blue-600 dark:text-blue-400 font-bold">
                                  VISA
                                </span>
                              )}
                              {payment.brand === "Mastercard" && (
                                <span className="text-red-600 dark:text-red-400 font-bold">
                                  MC
                                </span>
                              )}
                              {payment.brand === "Amex" && (
                                <span className="text-green-600 dark:text-green-400 font-bold">
                                  AMEX
                                </span>
                              )}
                              {payment.brand === "Elo" && (
                                <span className="text-purple-600 dark:text-purple-400 font-bold">
                                  ELO
                                </span>
                              )}
                              {payment.brand === "Desconhecida" && (
                                <CreditCard className="w-6 h-6 text-gray-400 dark:text-gray-300" />
                              )}
                            </div>
                            <div>
                              <p className="text-gray-900 dark:text-gray-100 font-medium">
                                {payment.nickname || "Cartão sem nome"}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                **** **** **** {payment.last4} | Exp:{" "}
                                {payment.expiryDate}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemovePayment(payment.id)}
                            className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 text-sm font-medium"
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setShowWallet(true)}
                    className="mt-3 text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-500 border border-orange-500 dark:border-orange-400 rounded-lg px-3 py-1 inline-block"
                  >
                    + Adicionar Método de Pagamento
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="mt-6 w-full bg-orange-500 dark:bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 uppercase"
            >
              Salvar Alterações
            </button>
          </div>

          <div className="w-full md:w-1/2 h-full overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center">
              <Heart className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3" />
              Últimos Eventos Curtidos
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              {likedEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-300 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Você ainda não tem eventos favoritados.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {likedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden relative hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => toggleLike(event)}
                        className="absolute top-4 right-4 text-2xl transition-all text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                      >
                        <Heart className="w-6 h-6" fill="currentColor" />
                      </button>
                      <div className="p-6">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          {event.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                          {event.date}
                        </p>
                        <p className="text-orange-500 dark:text-orange-400 font-medium mt-2 text-lg">
                          {event.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        user={userData}
        onSave={(data) => handleUpdateProfile({ ...userData, ...data })}
      />
      <EditPaymentModal
        isOpen={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        onSave={handleAddPayment}
      />
      <WalletModal
        isOpen={showWallet}
        onClose={() => setShowWallet(false)}
        onAddNew={() => {
          setShowWallet(false);
          setShowAddPayment(true);
        }}
        cards={paymentMethods}
        onRemove={handleRemovePayment}
        onUpdateCustomName={handleUpdateCustomName}
      />

      {showEditAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Gerenciar Endereço
            </h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Endereço
              </label>
              <input
                type="text"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full p-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100"
                placeholder="Digite seu endereço"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowEditAddress(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAddress}
                className="px-4 py-2 bg-orange-500 dark:bg-orange-600 text-white rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Confirmar Remoção
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tem certeza que deseja remover este método de pagamento?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelRemovePayment}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRemovePayment}
                className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-lg hover:bg-red-600 dark:hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
