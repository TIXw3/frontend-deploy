import { X } from "lucide-react";
import { LoginForm } from "../forms/LoginForm";
import { RegisterForm } from "../forms/RegisterForm";
import { RecoverPasswordForm } from "../forms/RecoverPasswordForm";

interface AuthModalProps {
  showModal: string | null;
  onClose: () => void;
  onSwitchForm: (form: string) => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (
    name: string,
    email: string,
    password: string,
    cpf: string,
    address: string,
    telefone: string,
    dataNascimento: string
  ) => void;
}

export function AuthModal({
  showModal,
  onClose,
  onSwitchForm,
  onLogin,
  onRegister,
}: AuthModalProps) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6 sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full max-w-md mx-4 sm:mx-auto p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {showModal === "login" && "Login"}
            {showModal === "register" && "Criar conta"}
            {showModal === "recover" && "Recuperar senha"}
          </h2>

          {showModal === "login" && (
            <LoginForm
              onSwitchForm={onSwitchForm}
              onLogin={onLogin}
              onClose={onClose}
            />
          )}

          {showModal === "register" && (
            <RegisterForm onSwitchForm={onSwitchForm} onRegister={onRegister} />
          )}

          {showModal === "recover" && (
            <RecoverPasswordForm onSwitchForm={onSwitchForm} />
          )}
        </div>
      </div>
    </div>
  );
}