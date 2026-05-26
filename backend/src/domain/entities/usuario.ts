export interface IUsuario {
  id: string;
  primer_nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  contrasena_hash: string;
  activo: boolean;
  fecha_baja?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Usuario implements IUsuario {
  id!: string;
  primer_nombre!: string;
  segundo_nombre?: string;
  apellido_paterno!: string;
  apellido_materno!: string;
  email!: string;
  contrasena_hash!: string;
  activo!: boolean;
  fecha_baja?: Date;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data: Partial<IUsuario>) {
    Object.assign(this, data);
  }

  get nombre_completo(): string {
    return `${this.primer_nombre} ${this.segundo_nombre || ''} ${this.apellido_paterno} ${this.apellido_materno}`.trim();
  }
}
