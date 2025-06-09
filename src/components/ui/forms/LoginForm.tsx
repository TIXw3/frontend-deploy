import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { auth, googleProvider } from "../../../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { isValidEmail, isValidPassword } from "../../../shared/utils/validation";
import { useAuth } from "../../../shared/contexts/AuthContext";

interface LoginFormProps {
  onSwitchForm: (form: string) => void;
  onLogin: (email: string, password: string) => void;
  onClose: () => void;
}

export function LoginForm({ onSwitchForm, onLogin, onClose }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onLogin(email, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      console.log("🔑 ID TOKEN:", idToken);

      const response = await fetch(
        "http://localhost:5000/api/auth/login-firebase",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      const { token, usuario } = data.data;
      localStorage.setItem("tixup_token", token);

      const tipoFinal = usuario.is_organizador ? "organizador" : "usuario";
      console.log("✅ Login Google bem-sucedido:", {
        ...usuario,
        tipo: tipoFinal,
      });

      login({
        id: usuario.id,
        name: usuario.nome,
        email: usuario.email,
        phone: usuario.telefone ?? "",
        address: usuario.endereco ?? "",
        avatarUrl:
          "",
        cpf: usuario.cpf ?? "",
        birthDate: usuario.datanascimento ?? "",
        tipo: usuario.tipo,
        is_organizador: usuario.is_organizador ?? false,
      });

      onClose();
    } catch (error) {
      console.error("❌ Erro no login com Google:", error);
      alert("Erro ao autenticar com o Google");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <div className="mt-1 relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
              email && !isValidEmail(email)
                ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                : "focus:ring-orange-500"
            } focus:outline-none focus:ring-2 focus:border-transparent`}
            placeholder="seu@email.com"
            required
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

      {/* Senha */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Senha
        </label>
        <div className="mt-1 relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full pl-10 pr-12 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
              password && !isValidPassword(password)
                ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                : "focus:ring-orange-500"
            } focus:outline-none focus:ring-2 focus:border-transparent`}
            placeholder="••••••••"
            required
          />
          <Lock
            className={`h-5 w-5 absolute left-3 top-2.5 ${
              password && !isValidPassword(password)
                ? "text-red-400 dark:text-red-400"
                : "text-gray-400 dark:text-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        {password && !isValidPassword(password) && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            A senha deve ter pelo menos 6 caracteres, incluindo uma letra
            maiúscula, um número e um caractere especial
          </p>
        )}
      </div>

      {/* Botão Entrar */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2 rounded-lg transition-colors ${
          isFormValid
            ? "bg-orange-500 hover:bg-orange-600 text-white"
            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
        }`}
      >
        Entrar
      </button>

      {/* OAuth Google */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300">
            ou
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Entrar com Google
        </button>
      </div>

      {/* Links para registrar/recuperar */}
      <div className="flex justify-between text-sm">
        <button
          type="button"
          onClick={() => onSwitchForm("register")}
          className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
        >
          Criar conta
        </button>
        <button
          type="button"
          onClick={() => onSwitchForm("recover")}
          className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
        >
          Esqueci minha senha
        </button>
      </div>
    </form>
  );
}