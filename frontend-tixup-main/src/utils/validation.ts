export const isValidEmail = (email: string): boolean => {
  return email.includes('@') && email.includes('.');
};

export const isValidPassword = (password: string): boolean => {
  // Mínimo 6 caracteres
  if (password.length < 6) return false;
  
  // Verifica se contém pelo menos uma letra maiúscula
  const hasUpperCase = /[A-Z]/.test(password);
  
  // Verifica se contém pelo menos um número
  const hasNumber = /\d/.test(password);
  
  // Verifica se contém pelo menos um caractere especial
  const hasSpecialChar = /[!@#$%^&*()_+\-=/[\]{};':"\\|,.<>/?]/.test(password);
  
  return hasUpperCase && hasNumber && hasSpecialChar;
};
export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11;
};