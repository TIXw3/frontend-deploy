export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
  cpf: string;
  birthDate: string;
  tipo: "usuario" | "organizador";
  is_admin?: boolean;
  is_organizador: boolean;
}
