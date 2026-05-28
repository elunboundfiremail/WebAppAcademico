import { Request, Response } from 'express';
import { GestionCalificacionesUseCase } from '../../application/use-cases/calificaciones/gestion-calificaciones.use-case';

export class CalificacionController {
  constructor(private gestionCalificaciones: GestionCalificacionesUseCase) {}

  async registrar(req: Request, res: Response) {
    try {
      const { inscripcion_id, nota, observacion } = req.body;
      
      // Convertimos los tipos explícitamente para que TypeScript esté feliz
      const calificacion = await this.gestionCalificaciones.registrar(
        String(inscripcion_id), 
        Number(nota), 
        String(observacion || "")
      );
      
      res.status(201).json(calificacion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async editar(req: Request, res: Response) {
    try {
      const { nota, observacion } = req.body;
      const calificacion = await this.gestionCalificaciones.editar(
        String(req.params.id), 
        Number(nota), 
        String(observacion || "")
      );
      res.status(200).json(calificacion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}