import { ICarrera } from '../entities/carrera';

export interface ICarreraRepository {
  findAll(): Promise<ICarrera[]>;
  findById(id: string): Promise<ICarrera | null>;
  create(data: Partial<ICarrera>): Promise<ICarrera>;
  update(id: string, data: Partial<ICarrera>): Promise<ICarrera | null>;
  delete(id: string): Promise<boolean>;
}