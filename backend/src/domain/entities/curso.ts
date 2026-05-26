export interface ICurso {
  id: string;
  codigo: string;
  nombre: string;
  materia_id: string;
  docente_id: string;
  cupo_maximo: number;
  cupo_disponible: number;
  horarios: string;
  activo: boolean;
  fecha_baja?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Curso implements ICurso {
  id!: string;
  codigo!: string;
  nombre!: string;
  materia_id!: string;
  docente_id!: string;
  cupo_maximo!: number;
  cupo_disponible!: number;
  horarios!: string;
  activo!: boolean;
  fecha_baja?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<ICurso>) {
    Object.assign(this, data);
  }

  canEnroll(): boolean {
    return this.activo && this.cupo_disponible > 0;
  }
}
