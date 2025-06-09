import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Bell,Lock,Mail,MessageSquare,Settings,Smartphone,Share2,ChevronDown,} from "lucide-react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface SecuritySetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

interface ConfirmDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-40"
        onClick={onCancel}
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 dark:text-gray-500 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={onCancel}
            >
              <span className="sr-only">Fechar modal</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 dark:text-gray-500 w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Tem certeza que deseja salvar as alterações?
              </h3>
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={onConfirm}
              >
                Sim
              </button>
              <button
                type="button"
                className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 text-sm font-medium px-5 py-2.5 focus:z-10"
                onClick={onCancel}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function ConfigColab() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "email",
      title: "Notificações por E-mail",
      description: "Receba atualizações sobre seus eventos",
      enabled: true,
    },
    {
      id: "push",
      title: "Notificações Push",
      description: "Receba alertas em tempo real",
      enabled: false,
    },
    {
      id: "marketing",
      title: "E-mails de Marketing",
      description: "Receba ofertas e novidades",
      enabled: true,
    },
    {
      id: "sales",
      title: "Relatórios de Vendas",
      description: "Receba relatórios diários de vendas",
      enabled: true,
    },
  ]);

  const [security, setSecurity] = useState<SecuritySetting[]>([
    {
      id: "2fa",
      title: "Autenticação em Dois Fatores",
      description: "Adicione uma camada extra de segurança",
      enabled: false,
    },
    {
      id: "login",
      title: "Notificações de Login",
      description: "Seja alertado sobre novos acessos",
      enabled: true,
    },
    {
      id: "ip",
      title: "Verificação de IP",
      description: "Monitore acessos de locais diferentes",
      enabled: true,
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState("Português (Brasil)");
  const [selectedCurrency, setSelectedCurrency] = useState("Real (BRL)");
  const [selectedTimeZone, setSelectedTimeZone] = useState("São Paulo (GMT-3)");
  const [changesMade, setChangesMade] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Carregar configurações salvas do localStorage ao montar o componente
  useEffect(() => {
    const savedSettings = localStorage.getItem("colabSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setNotifications(parsedSettings.notifications || notifications);
      setSecurity(parsedSettings.security || security);
      setSelectedLanguage(parsedSettings.selectedLanguage || selectedLanguage);
      setSelectedCurrency(parsedSettings.selectedCurrency || selectedCurrency);
      setSelectedTimeZone(parsedSettings.selectedTimeZone || selectedTimeZone);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
    setChangesMade(true);
  };

  const toggleSecurity = (id: string) => {
    setSecurity(
      security.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
    setChangesMade(true);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
    setChangesMade(true);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
    setChangesMade(true);
  };

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeZone(e.target.value);
    setChangesMade(true);
  };

  const handleSave = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    const colabSettings = {
      notifications,
      security,
      selectedLanguage,
      selectedCurrency,
      selectedTimeZone,
    };
    localStorage.setItem("colabSettings", JSON.stringify(colabSettings));
    setChangesMade(false);
    alert("Alterações salvas com sucesso!");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="w-8 h-8 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Configurações do Organizador
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notificações */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Notificações
              </h2>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleNotification(notification.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notification.enabled
                        ? "bg-orange-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notification.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Segurança */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Segurança
              </h2>
            </div>
            <div className="space-y-4">
              {security.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-start justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      {setting.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {setting.description}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSecurity(setting.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      setting.enabled
                        ? "bg-orange-500"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        setting.enabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferências */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Settings className="w-5 h-5 text-orange-500" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
          Preferências
        </h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Idioma
          </label>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none text-sm sm:text-base"
              aria-label="Selecionar idioma"
            >
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Moeda
          </label>
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none text-sm sm:text-base"
              aria-label="Selecionar moeda"
            >
              <option>Real (BRL)</option>
              <option>US Dollar (USD)</option>
              <option>Euro (EUR)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fuso Horário
          </label>
          <div className="relative">
            <select
              value={selectedTimeZone}
              onChange={handleTimeZoneChange}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 pl-3 pr-10 text-gray-800 dark:text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none text-sm sm:text-base"
              aria-label="Selecionar fuso horário"
            >
              <option>São Paulo (GMT-3)</option>
              <option>New York (GMT-4)</option>
              <option>London (GMT+1)</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>
    </div>

          {/* Integrações */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Share2 className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Integrações
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      Facebook
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Conectado
                    </p>
                  </div>
                </div>
                <Link
                  to="/detalhes-evento"
                  state={{ platform: "Facebook" }}
                  className="text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Configurar
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-pink-600 dark:text-pink-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      Instagram
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Não conectado
                    </p>
                  </div>
                </div>
                <Link
                  to="/detalhes-evento"
                  state={{ platform: "Instagram" }}
                  className="text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Conectar
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">
                      WhatsApp
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Não conectado
                    </p>
                  </div>
                </div>
                <Link
                  to="/detalhes-evento"
                  state={{ platform: "WhatsApp" }}
                  className="text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
                >
                  Conectar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!changesMade}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              changesMade
                ? "bg-orange-500 text-white hover:bg-orange-600 dark:hover:bg-orange-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            Salvar Alterações
          </button>
        </div>
      </div>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default ConfigColab;