import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    birthDate: string;
  };
  onSave: (userData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    birthDate: string;
  }) => void;
}

export function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    cpf: user.cpf || '',
    birthDate: user.birthDate || '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cpf: '',
    birthDate: '',
  });

  const validateCPF = (cpf: string): boolean => {
    const cleanedCPF = cpf.replace(/\D/g, '');
    if (cleanedCPF.length !== 11) return false;

    if (/^(\d)\1+$/.test(cleanedCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF[i]) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== parseInt(cleanedCPF[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF[i]) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;
    if (secondDigit !== parseInt(cleanedCPF[10])) return false;

    return true;
  };

  const validateBirthDate = (birthDate: string): boolean => {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(birthDate)) return false;

    const [, day, month, year] = birthDate.match(dateRegex) || [];
    const parsedDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(parsedDate.getTime())) return false;

    const today = new Date();
    const age = today.getFullYear() - parsedDate.getFullYear();
    const monthDiff = today.getMonth() - parsedDate.getMonth();
    const dayDiff = today.getDate() - parsedDate.getDate();
    const adjustedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (parsedDate > today) return false;
    if (adjustedAge < 13) return false;

    return true;
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      address: '',
      cpf: '',
      birthDate: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nome completo é obrigatório.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido.';
      isValid = false;
    }

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Telefone é obrigatório.';
      isValid = false;
    } else if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
      newErrors.phone = 'Telefone deve ter 10 ou 11 dígitos (DDD + número).';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório.';
      isValid = false;
    }

    const cleanedCPF = formData.cpf.replace(/\D/g, '');
    if (!cleanedCPF) {
      newErrors.cpf = 'CPF é obrigatório.';
      isValid = false;
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido.';
      isValid = false;
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Data de nascimento é obrigatória.';
      isValid = false;
    } else if (!validateBirthDate(formData.birthDate)) {
      newErrors.birthDate = 'Data de nascimento inválida (formato DD/MM/YYYY, mínimo 13 anos).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let formattedValue = value;

    if (id === 'cpf') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }

    if (id === 'phone') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    }

    if (id === 'birthDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{4})\d+?$/, '$1');
    }

    setFormData({ ...formData, [id]: formattedValue });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" />
        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Editar Informações Pessoais
            </h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="(XX) XXXXX-XXXX"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.address}</p>}
            </div>
            <div>
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                CPF
              </label>
              <input
                type="text"
                id="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="XXX.XXX.XXX-XX"
              />
              {errors.cpf && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.cpf}</p>}
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Data de Nascimento
              </label>
              <input
                type="text"
                id="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="block w-full mt-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="DD/MM/YYYY"
              />
              {errors.birthDate && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.birthDate}</p>}
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
              >
                Salvar alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}