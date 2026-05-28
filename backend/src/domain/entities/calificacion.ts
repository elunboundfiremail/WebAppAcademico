export interface ICalificacion {
  id: string;
  inscripcion_id: string;
  nota: number;
  observacion: string;
  fecha_registro: Date;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Calificacion implements ICalificacion {
  id!: string;
  inscripcion_id!: string;
  nota!: number;
  observacion!: string;
  fecha_registro!: Date;
  activo!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<ICalificacion>) {
    Object.assign(this, data);
  }
}