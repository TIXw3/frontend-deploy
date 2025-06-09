import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  CreditCard,
  Phone,
  Calendar,
  MapPin,
} from "lucide-react";
import {
  isValidEmail,
  isValidPassword,
  isValidCPF,
} from "../../../shared/utils/validation";

interface RegisterFormProps {
  onSwitchForm: (form: string) => void;
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

interface FormData {
  nome: string;
  email: string;
  cpf: string;
  address: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
  confirmarSenha: string;
}

export function RegisterForm({ onSwitchForm, onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cpf: "",
    address: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }

    if (name === "telefone") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    validateField(name, formattedValue);
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    switch (name) {
      case "nome":
        if (value.length < 3) {
          newErrors.nome = "O nome deve ter pelo menos 3 caracteres";
        } else {
          delete newErrors.nome;
        }
        break;
      case "email":
        if (!isValidEmail(value)) {
          newErrors.email = "Por favor, insira um email válido";
        } else {
          delete newErrors.email;
        }
        break;
      case "cpf":
        if (!isValidCPF(value)) {
          newErrors.cpf = "CPF inválido";
        } else {
          delete newErrors.cpf;
        }
        break;
      case "address":
        if (value.length < 5) {
          newErrors.address = "O endereço deve ter pelo menos 5 caracteres";
        } else {
          delete newErrors.address;
        }
        break;
      case "telefone": {
        const telefoneDigits = value.replace(/\D/g, "");
        if (telefoneDigits.length !== 11) {
          newErrors.telefone = "Telefone inválido (deve ter 11 dígitos)";
        } else {
          delete newErrors.telefone;
        }
        break;
      }
      case "dataNascimento": {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        if (!value || birthDate > today) {
          newErrors.dataNascimento = "Data de nascimento inválida";
        } else if (age < 18) {
          newErrors.dataNascimento = "Você deve ter pelo menos 18 anos";
        } else {
          delete newErrors.dataNascimento;
        }
        break;
      }
      case "senha":
        if (!isValidPassword(value)) {
          newErrors.senha =
            "A senha deve ter pelo menos 6 caracteres, incluindo uma letra maiúscula, um número e um caractere especial";
        } else {
          delete newErrors.senha;
        }
        if (formData.confirmarSenha && value !== formData.confirmarSenha) {
          newErrors.confirmarSenha = "As senhas não coincidem";
        } else {
          delete newErrors.confirmarSenha;
        }
        break;
      case "confirmarSenha":
        if (value !== formData.senha) {
          newErrors.confirmarSenha = "As senhas não coincidem";
        } else {
          delete newErrors.confirmarSenha;
        }
        break;
    }

    setErrors(newErrors);
  };

  const isFormValid = () => {
    const telefoneDigits = formData.telefone.replace(/\D/g, "");
    const today = new Date();
    const birthDate = new Date(formData.dataNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return (
      formData.nome.length >= 3 &&
      isValidEmail(formData.email) &&
      isValidCPF(formData.cpf) &&
      formData.address.length >= 5 &&
      telefoneDigits.length === 11 &&
      formData.dataNascimento &&
      birthDate <= today &&
      age >= 18 &&
      isValidPassword(formData.senha) &&
      formData.senha === formData.confirmarSenha &&
      Object.keys(errors).length === 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onRegister(
        formData.nome,
        formData.email,
        formData.senha,
        formData.cpf,
        formData.address,
        formData.telefone,
        formData.dataNascimento
      );
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-1">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="nome"
          >
            Nome
          </label>
          <div className="relative">
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.nome
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="Seu nome completo"
            />
            <User
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.nome
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.nome && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.nome}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.email
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="seu@email.com"
            />
            <Mail
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.email
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="cpf"
          >
            CPF
          </label>
          <div className="relative">
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              maxLength={14}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.cpf
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="000.000.000-00"
            />
            <CreditCard
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.cpf
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.cpf && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.cpf}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="address"
          >
            Endereço
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.address
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="Rua, número, cidade"
            />
            <MapPin
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.address
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="telefone"
          >
            Telefone
          </label>
          <div className="relative">
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              maxLength={15}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.telefone
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="(11) 99999-9999"
            />
            <Phone
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.telefone
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.telefone && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.telefone}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="dataNascimento"
          >
            Data de Nascimento
          </label>
          <div className="relative">
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.dataNascimento
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            <Calendar
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.dataNascimento
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
          </div>
          {errors.dataNascimento && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.dataNascimento}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="senha"
          >
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.senha
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="••••••••"
            />
            <Lock
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.senha
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.senha && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.senha}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="confirmarSenha"
          >
            Confirmar Senha
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-12 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 ${
                errors.confirmarSenha
                  ? "border-red-300 focus:ring-red-500 dark:border-red-400"
                  : "focus:ring-orange-500"
              } focus:outline-none focus:ring-2 focus:border-transparent`}
              placeholder="••••••••"
            />
            <Lock
              className={`h-5 w-5 absolute left-3 top-2.5 ${
                errors.confirmarSenha
                  ? "text-red-400 dark:text-red-400"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmarSenha && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {errors.confirmarSenha}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 rounded-lg transition-colors ${
              isFormValid()
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Cadastrar
          </button>
          <div className="flex justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => onSwitchForm("login")}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
            >
              Já tenho uma conta
            </button>
            <button
              type="button"
              onClick={() => onSwitchForm("recover")}
              className="text-orange-500 dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300"
            >
              Esqueci minha senha
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}