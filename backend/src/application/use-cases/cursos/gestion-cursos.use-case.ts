import { IAcademicoRepository } from '../../../domain/repositories/academico.repository';
import { Curso } from '../../../domain/entities/curso';

export class GestionCursosUseCase {
  // Patrón de Inyección de Dependencias
  constructor(private academicoRepository: IAcademicoRepository) {}

  async crear(cursoData: Curso) {
    // Usamos cupo_maximo según tu entidad
    if (cursoData.cupo_maximo <= 0) {
      throw new Error("El cupo máximo debe ser mayor a 0");
    }
    return await this.academicoRepository.crearCurso(cursoData);
  }

  async editar(id: string, cursoData: Partial<Curso>) {
    return await this.academicoRepository.editarCurso(id, cursoData);
  }

  async eliminar(id: string) {
    // Borrado lógico según requerimientos
    return await this.academicoRepository.eliminarCurso(id);
  }
}