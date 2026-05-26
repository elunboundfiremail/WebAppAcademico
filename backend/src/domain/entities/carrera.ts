export interface ICarrera {
  id: string;
  codigo: string;
  nombre: string;
  descripcion?: string;
  duracion_semestres: number;
  activo: boolean;
  fecha_baja?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Carrera implements ICarrera {
  id!: string;
  codigo!: string;
  nombre!: string;
  descripcion?: string;
  duracion_semestres!: number;
  activo!: boolean;
  fecha_baja?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<ICarrera>) {
    Object.assign(this, data);
  }
}