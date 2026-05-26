export interface IRepositories {
  usuario: IUsuarioRepository;
  curso: ICursoRepository;
}

export interface IUsuarioRepository {
  create(data: any): Promise<any>;
  findById(id: string): Promise<any | null>;
  findByEmail(email: string): Promise<any | null>;
  findAll(): Promise<any[]>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
}

export interface ICursoRepository {
  create(data: any): Promise<any>;
  findById(id: string): Promise<any | null>;
  findAll(): Promise<any[]>;
  findByMateria(materiaId: string): Promise<any[]>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<void>;
}
