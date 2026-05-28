import { Request, Response } from 'express';
import { GestionInscripcionesUseCase } from '../../application/use-cases/inscripciones/gestion-inscripciones.use-case';

export class InscripcionController {
  constructor(private gestionInscripciones: GestionInscripcionesUseCase) {}

  async inscribir(req: Request, res: Response) {
    try {
      const { estudiante_id, curso_id } = req.body;
      
      // Aseguramos que los IDs pasen como texto (String) para que TypeScript no marque errores
      const inscripcion = await this.gestionInscripciones.inscribir(String(estudiante_id), String(curso_id));
      
      res.status(201).json(inscripcion);
    } catch (error: any) {
      // Si choca el horario o está duplicado, Express devuelve un error 400 automático
      res.status(400).json({ error: error.message });
    }
  }
}