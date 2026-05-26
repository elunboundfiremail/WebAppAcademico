import { Curso } from "../entities/curso";
import { Inscripcion } from "../entities/inscripcion";
import { Calificacion } from "../entities/calificacion";

export interface AcademicoRepository {
  guardarCurso(curso: Curso): Promise<void>;
  buscarCursoPorId(id: number): Promise<Curso | null>;
  guardarInscripcion(inscripcion: Inscripcion): Promise<void>;
  verificarInscripcionDuplicada(estudianteId: number, cursoId: number): Promise<boolean>;
  guardarCalificacion(calificacion: Calificacion): Promise<void>;
  obtenerNotasPorInscripcion(inscripcionId: number): Promise<Calificacion[]>;
}