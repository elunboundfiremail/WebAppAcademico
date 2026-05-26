import { Usuario } from "../entities/usuario";

export interface UsuarioRepository {
  guardar(usuario: Usuario): Promise<void>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
}