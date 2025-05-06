import React, { useState } from "react";
import api from "../../services/api";
import { Bell, Lock, Globe, Shield, Wallet, Smartphone, Mail, AlertCircle } from "lucide-react";
import { getAuth } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { UserData } from "../../types/UserData";

interface UserSettingsProps {
  userData: UserData;
  onPromoted: (novoTipo: "usuario" | "organizador") => void;
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

const UserSettings: React.FC<UserSettingsProps> = ({
  userData,
  onPromoted,
}) => {
  const { login } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "pt-BR",
    currency: "BRL",
  });
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginNotifications: true,
  });
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePromote = async () => {
    console.log("🟠 handlePromote foi chamado!");
    try {
      const token = localStorage.getItem("tixup_token");
      if (!token) throw new Error("Token não encontrado no localStorage");
      console.log("🔐 Token encontrado:", token);

      console.log("📡 Enviando PUT /usuarios/tornar-organizador");
      await api.put("/usuarios/tornar-organizador");

      const userFirebase = getAuth().currentUser;
      if (!userFirebase) throw new Error("Usuário Firebase não logado");
      console.log("🔥 Firebase user:", userFirebase);

      const idToken = await userFirebase.getIdToken(true);
      console.log("🔑 Novo ID Token:", idToken);

      const loginRes = await api.post("/auth/login-firebase", { idToken });

      const usuarioAtualizado = loginRes.data.data.usuario;
      const novoToken = loginRes.data.data.token;

      console.log("📥 Usuário atualizado após promoção:", usuarioAtualizado);

      localStorage.setItem("tixup_token", novoToken);
      localStorage.setItem("tixup_user", JSON.stringify(usuarioAtualizado));

      login({
        id: usuarioAtualizado.id,
        name: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        phone: usuarioAtualizado.telefone || "",
        address: usuarioAtualizado.endereco || "",
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        cpf: usuarioAtualizado.cpf || "",
        birthDate: usuarioAtualizado.datanascimento || "",
        tipo: usuarioAtualizado.tipo,
        is_organizador: usuarioAtualizado.tipo === "organizador",
        is_admin: usuarioAtualizado.is_admin ?? false,
      });

      console.log("✅ Login atualizado com organizador no contexto!");

      onPromoted(usuarioAtualizado.tipo);
      alert("✅ Agora você é um organizador!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido";
      console.error("🚨 Erro ao promover para organizador:", err);
      alert(`❌ ${msg}`);
    }
  };

  const handleSave = () => setShowConfirm(true);
  const handleConfirm = () => {
    setShowConfirm(false);
    const userSettings = { notifications, preferences, security };
    localStorage.setItem("userSettings", JSON.stringify(userSettings));
  };
  const handleCancel = () => setShowConfirm(false);

  console.log("👀 userData:", userData);
  console.log("🔎 is_organizador?", userData.is_organizador);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Configurações Adicionais
          </h1>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Tipo atual: <span className="font-semibold">{userData.is_organizador ? "Organizador" : "Usuário"}</span>
                </p>
                {!userData.is_organizador && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Torne-se um organizador para criar e gerenciar eventos!
                  </p>
                )}
              </div>
              {!userData.is_organizador && (
                <button
                  onClick={() => {
                    console.log("🎯 handlePromote disparado");
                    handlePromote();
                  }}
                  className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800"
                >
                  <span className="mr-2">Tornar Organizador</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Gerencie suas preferências de conta e segurança
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Bell size={20} className="text-orange-500" />
              Notificações
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Notificações por E-mail
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba atualizações sobre seus eventos
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        email: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Notificações Push
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba alertas em tempo real
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        push: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      E-mails de Marketing
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receba ofertas e novidades
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        marketing: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Shield size={20} className="text-orange-500" />
              Segurança
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Autenticação em Dois Fatores
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.twoFactor}
                    onChange={(e) =>
                      setSecurity({ ...security, twoFactor: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Notificações de Login
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Seja alertado sobre novos acessos
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={security.loginNotifications}
                    onChange={(e) =>
                      setSecurity({
                        ...security,
                        loginNotifications: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <Globe size={20} className="text-orange-500" />
              Preferências
            </h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Globe
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Idioma
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha o idioma da plataforma
                    </p>
                  </div>
                </div>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 DARK:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet
                    size={20}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-100">
                      Moeda
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Escolha sua moeda preferida
                    </p>
                  </div>
                </div>
                <select
                  value={preferences.currency}
                  onChange={(e) =>
                    setPreferences({ ...preferences, currency: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="BRL">Real (BRL)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Changes Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Faça suas alterações e clique em 'Salvar Alterações' para
                persistir suas preferências.
              </p>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </main>
      <ConfirmDialog
        isOpen={showConfirm}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default UserSettings;