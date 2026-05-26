export interface IMateria {
  id: string;
  codigo: string;
  nombre: string;
  carrera_id: string;
  semestre: number;
  creditos: number;
  activo: boolean;
  fecha_baja?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Materia implements IMateria {
  id!: string;
  codigo!: string;
  nombre!: string;
  carrera_id!: string;
  semestre!: number;
  creditos!: number;
  activo!: boolean;
  fecha_baja?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<IMateria>) {
    Object.assign(this, data);
  }
}