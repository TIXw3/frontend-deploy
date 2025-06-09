import React, { useState } from "react";
import { Mail } from "lucide-react";
import { isValidEmail } from "../../../shared/utils/validation";

interface RecoverPasswordFormProps {
  onSwitchForm: (form: string) => void;
}

export function RecoverPasswordForm({
  onSwitchForm,
}: RecoverPasswordFormProps) {
  const [email, setEmail] = useState("");

  const isFormValid = isValidEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recover:", { email });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Digite seu email para receber as instruções de recuperação de senha.
      </p>
      <div>
        <label
          htmlFor="recover-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            id="recover-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
              email && !isValidEmail(email)
                ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                : "focus:ring-orange-500"
            } focus:outline-none focus:ring-2 focus:border-transparent`}
            placeholder="seu@email.com"
          />
          <Mail
            className={`h-5 w-5 absolute left-3 top-2.5 ${
              email && !isValidEmail(email)
                ? "text-red-400 dark:text-red-400"
                : "text-gray-400 dark:text-gray-300"
            }`}
          />
        </div>
        {email && !isValidEmail(email) && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            Por favor, insira um email válido
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2 rounded-lg transition-colors ${
          isFormValid
            ? "bg-orange-500 hover:bg-orange-600 text-white"
            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }`}
      >
        Enviar instruções
      </button>
      <div className="text-center">
        <button
          type="button"
          onClick={() => onSwitchForm("login")}
          className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 text-sm"
        >
          Voltar ao login
        </button>
      </div>
    </form>
  );
}