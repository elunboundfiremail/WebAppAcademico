export interface IInscripcion {
  id: string;
  estudiante_id: string;
  curso_id: string;
  estado: string;
  fecha_inscripcion: Date;
  activo: boolean;
  fecha_baja?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Inscripcion implements IInscripcion {
  id!: string;
  estudiante_id!: string;
  curso_id!: string;
  estado!: string;
  fecha_inscripcion!: Date;
  activo!: boolean;
  fecha_baja?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<IInscripcion>) {
    Object.assign(this, data);
  }
}