import { Curso, ICurso } from '../entities/curso';

export interface IAcademicoRepository {
  crearCurso(curso: Curso): Promise<Curso>;
  editarCurso(id: string, curso: Partial<ICurso>): Promise<Curso>;
  eliminarCurso(id: string): Promise<boolean>;
}