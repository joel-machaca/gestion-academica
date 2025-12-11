export interface UsuarioModel {
    id?: number;          // opcional al crear
  email: string;
  password: string;
  nombre: string;
  roleId: number;
  estado: string;
  imagen: string;
}
