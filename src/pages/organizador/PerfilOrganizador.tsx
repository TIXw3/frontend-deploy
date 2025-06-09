import React, { useState } from 'react';
import { Camera, Save, Edit2, AlertCircle, Shield, Trash2, LogOut, ChevronRight } from 'lucide-react';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import ImageCropper from '../../components/ui/editors/ImageCropper';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  birthDate: string;
  company: {
    legalName: string;
    tradeName: string;
    legalType: string;
  };
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankInfo: {
    bank: string;
    agency: string;
    account: string;
    type: string;
  };
}

interface ValidationErrors {
  [key: string]: string;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  phone: yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone inválido').required('Telefone é obrigatório'),
  cpfCnpj: yup.string()
    .test('cpf-cnpj', 'CPF/CNPJ inválido', (value) => {
      if (!value) return false;
      const numbers = value.replace(/[^\d]/g, '');
      return numbers.length === 11 || numbers.length === 14;
    })
    .required('CPF/CNPJ é obrigatório'),
  birthDate: yup.date().max(new Date(), 'Data não pode ser futura').required('Data de nascimento é obrigatória'),
  company: yup.object().shape({
    legalName: yup.string().required('Razão Social é obrigatória'),
    tradeName: yup.string().required('Nome Fantasia é obrigatório'),
    legalType: yup.string().required('Natureza Jurídica é obrigatória'),
  }),
  address: yup.object().shape({
    street: yup.string().required('Rua é obrigatória'),
    number: yup.string().required('Número é obrigatório'),
    neighborhood: yup.string().required('Bairro é obrigatório'),
    city: yup.string().required('Cidade é obrigatória'),
    state: yup.string().length(2, 'Use a sigla do estado').required('Estado é obrigatório'),
    zipCode: yup.string().matches(/^\d{5}-\d{3}$/, 'CEP inválido').required('CEP é obrigatório'),
  }),
  bankInfo: yup.object().shape({
    bank: yup.string().required('Banco é obrigatório'),
    agency: yup.string().matches(/^\d{4}-\d{1}$/, 'Agência inválida').required('Agência é obrigatória'),
    account: yup.string().matches(/^\d{5}-\d{1}$/, 'Conta inválida').required('Conta é obrigatória'),
    type: yup.string().oneOf(['Corrente', 'Poupança'], 'Tipo de conta inválido').required('Tipo de conta é obrigatório'),
  }),
});

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg');
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [profile, setProfile] = useState<ProfileData>({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(44) 99999-9999',
    cpfCnpj: '123.456.789-00',
    birthDate: '1990-05-15',
    company: {
      legalName: 'Eventos Silva LTDA',
      tradeName: 'Silva Eventos',
      legalType: 'Sociedade Limitada',
    },
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Sala 45',
      neighborhood: 'Centro',
      city: 'Maringá',
      state: 'PR',
      zipCode: '87050-123'
    },
    bankInfo: {
      bank: 'Banco do Brasil',
      agency: '1234-5',
      account: '12345-6',
      type: 'Corrente'
    }
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, profileImage: 'Imagem deve ter no máximo 5MB' });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setShowCropper(true);
        setErrors({ ...errors, profileImage: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleCropSave = () => {
    if (tempImage && croppedArea) {
      const img = new Image();
      img.src = tempImage;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = croppedArea.width;
        canvas.height = croppedArea.height;

        ctx.drawImage(
          img,
          croppedArea.x,
          croppedArea.y,
          croppedArea.width,
          croppedArea.height,
          0,
          0,
          croppedArea.width,
          croppedArea.height
        );

        const croppedImage = canvas.toDataURL('image/jpeg', 0.8);
        setProfileImage(croppedImage);
        setShowCropper(false);
        setTempImage(null);
        setCroppedArea(null);
      };
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImage(null);
    setCroppedArea(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string,
    subfield?: string
  ) => {
    const value = e.target.value;
    
    if (subfield) {
      setProfile(prev => ({
        ...prev,
        [field]: {
          ...((prev[field as keyof ProfileData] as object) || {}),
          [subfield]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    if (subfield) {
      setErrors(prev => ({ ...prev, [`${field}.${subfield}`]: '' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(profile, { abortEarly: false });
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: ValidationErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (isValid) {
      setIsEditing(false);
      setErrors({});
      console.log('Saving profile:', profile);
    }
  };

  const getFieldError = (field: string, subfield?: string) => {
    const errorKey = subfield ? `${field}.${subfield}` : field;
    return errors[errorKey];
  };

  const renderInput = (
    field: string,
    label: string,
    mask?: string,
    subfield?: string,
    type: string = 'text'
  ) => {
    const rawValue = subfield 
      ? (profile[field as keyof ProfileData] as Record<string, string>)[subfield]
      : profile[field as keyof ProfileData];
    const value = typeof rawValue === 'string' || typeof rawValue === 'number' ? rawValue : '';
    const error = getFieldError(field, subfield);
    
    const inputProps = {
      type,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, field, subfield),
      disabled: !isEditing,
      className: `w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:outline-none focus:ring-2 ${
        error ? 'focus:ring-red-300 dark:focus:ring-red-500' : 'focus:ring-orange-300 dark:focus:ring-orange-500'
      } disabled:bg-gray-50 dark:disabled:bg-gray-700 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800`
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{label}</label>
        {mask ? (
          <InputMask
            mask={mask}
            {...inputProps}
          />
        ) : (
          <input {...inputProps} />
        )}
        {error && (
          <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle size={14} />
            {error}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Perfil do Organizador</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Gerencie suas informações pessoais e dados de contato
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-orange-500 to-orange-600">
            <div className="absolute -bottom-16 left-6 flex items-end">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md cursor-pointer">
                    <Camera size={20} className="text-gray-600 dark:text-gray-300" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-white dark:bg-gray-800 text-[#FF7A00] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-gray-700"
                >
                  <Save size={18} />
                  Salvar
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white dark:bg-gray-800 text-[#FF7A00] px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-gray-700"
                >
                  <Edit2 size={18} />
                  Editar
                </button>
              )}
            </div>
          </div>

          <div className="pt-20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Informações Pessoais</h2>
                
                {renderInput('name', 'Nome Completo')}
                {renderInput('email', 'Email', undefined, undefined, 'email')}
                {renderInput('phone', 'Telefone', '(99) 99999-9999')}
                {renderInput('cpfCnpj', 'CPF/CNPJ', '999.999.999-99')}
                {renderInput('birthDate', 'Data de Nascimento', undefined, undefined, 'date')}
                
                <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dados da Empresa</h3>
                  {renderInput('company', 'Razão Social', undefined, 'legalName')}
                  {renderInput('company', 'Nome Fantasia', undefined, 'tradeName')}
                  {renderInput('company', 'Natureza Jurídica', undefined, 'legalType')}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Endereço e Dados Bancários</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    {renderInput('address', 'Rua', undefined, 'street')}
                  </div>

                  <div>
                    {renderInput('address', 'Número', undefined, 'number')}
                  </div>

                  <div>
                    {renderInput('address', 'Complemento', undefined, 'complement')}
                  </div>

                  <div>
                    {renderInput('address', 'Bairro', undefined, 'neighborhood')}
                  </div>

                  <div>
                    {renderInput('address', 'CEP', '99999-999', 'zipCode')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {renderInput('address', 'Cidade', undefined, 'city')}
                  </div>

                  <div>
                    {renderInput('address', 'Estado', undefined, 'state')}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dados Bancários</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      {renderInput('bankInfo', 'Banco', undefined, 'bank')}
                    </div>

                    <div>
                      {renderInput('bankInfo', 'Agência', '9999-9', 'agency')}
                    </div>

                    <div>
                      {renderInput('bankInfo', 'Conta', '99999-9', 'account')}
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Tipo de Conta</label>
                      <select
                        value={profile.bankInfo.type}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange(e, 'bankInfo', 'type')}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border ${
                          getFieldError('bankInfo', 'type') ? 'border-red-300 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } rounded-md focus:outline-none focus:ring-2 ${
                          getFieldError('bankInfo', 'type') ? 'focus:ring-red-300 dark:focus:ring-red-500' : 'focus:ring-orange-300 dark:focus:ring-orange-500'
                        } disabled:bg-gray-50 dark:disabled:bg-gray-700 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800`}
                      >
                        <option value="Corrente">Conta Corrente</option>
                        <option value="Poupança">Conta Poupança</option>
                      </select>
                      {getFieldError('bankInfo', 'type') && (
                        <div className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {getFieldError('bankInfo', 'type')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showCropper && tempImage && (
          <ImageCropper
            image={tempImage}
            onCropComplete={handleCropComplete}
            onClose={handleCropCancel}
            onSave={handleCropSave}
          />
        )}

        <div className="mt-6 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Shield size={20} className="text-gray-500 dark:text-gray-400" />
                Configurações da Conta
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-gray-500 dark:text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">Alterar senha</h3>
                      <p className="text-gray-500 dark:text-gray-400">Atualize sua senha de acesso</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
                </button>
                
                <button className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <LogOut size={18} className="text-gray-500 dark:text-gray-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">Encerrar outras sessões</h3>
                      <p className="text-gray-500 dark:text-gray-400">Desconecte-se de outros dispositivos</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400 dark:text-gray-500" />
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-700 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Trash2 size={18} className="text-red-600 dark:text-red-400" />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">Excluir conta</h3>
                      <p className="text-red-500 dark:text-red-400">Esta ação não pode ser desfeita</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-red-400 dark:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;