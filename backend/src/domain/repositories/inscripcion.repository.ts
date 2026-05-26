import { IInscripcion } from '../entities/inscripcion';

export interface IInscripcionRepository {
  findAll(): Promise<IInscripcion[]>;
  findById(id: string): Promise<IInscripcion | null>;
  findByEstudianteId(estudiante_id: string): Promise<IInscripcion[]>;
  findByCursoId(curso_id: string): Promise<IInscripcion[]>;
  create(data: Partial<IInscripcion>): Promise<IInscripcion>;
  update(id: string, data: Partial<IInscripcion>): Promise<IInscripcion | null>;
  delete(id: string): Promise<boolean>;
}