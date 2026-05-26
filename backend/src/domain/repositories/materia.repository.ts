import { IMateria } from '../entities/materia';

export interface IMateriaRepository {
  findAll(): Promise<IMateria[]>;
  findById(id: string): Promise<IMateria | null>;
  findByCarreraId(carrera_id: string): Promise<IMateria[]>;
  create(data: Partial<IMateria>): Promise<IMateria>;
  update(id: string, data: Partial<IMateria>): Promise<IMateria | null>;
  delete(id: string): Promise<boolean>;
}