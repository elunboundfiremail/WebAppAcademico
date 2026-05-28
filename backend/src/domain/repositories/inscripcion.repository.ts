import { Inscripcion } from '../entities/inscripcion';

export interface IInscripcionRepository {
  crearInscripcion(inscripcion: Inscripcion): Promise<Inscripcion>;
  
  verificarDuplicidad(estudianteId: string, cursoId: string): Promise<boolean>;
  verificarSolapamiento(estudianteId: string, nuevoCursoId: string): Promise<boolean>;
}