import { Request, Response } from 'express';
import { GestionCursosUseCase } from '../../application/use-cases/cursos/gestion-cursos.use-case';

export class CursoController {
  constructor(private gestionCursos: GestionCursosUseCase) {}

  async crear(req: Request, res: Response) {
    try {
      const curso = await this.gestionCursos.crear(req.body);
      res.status(201).json(curso);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async editar(req: Request, res: Response) {
    try {
      // Usamos String() para asegurar que TypeScript sepa que es texto
      const curso = await this.gestionCursos.editar(String(req.params.id), req.body);
      res.status(200).json(curso);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async eliminar(req: Request, res: Response) {
    try {
      // Usamos String() aquí también
      await this.gestionCursos.eliminar(String(req.params.id));
      res.status(200).json({ message: "Curso eliminado correctamente" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}