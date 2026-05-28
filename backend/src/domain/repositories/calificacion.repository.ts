import { Calificacion, ICalificacion } from '../entities/calificacion';

export interface ICalificacionRepository {
  registrarNota(calificacion: Calificacion): Promise<Calificacion>;
  actualizarNota(id: string, datos: Partial<ICalificacion>): Promise<Calificacion>;
  obtenerPorInscripcion(inscripcionId: string): Promise<Calificacion | null>;
}