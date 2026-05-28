import { ICalificacionRepository } from '../../../domain/repositories/calificacion.repository';
import { Calificacion } from '../../../domain/entities/calificacion';

export class GestionCalificacionesUseCase {
  constructor(private calificacionRepository: ICalificacionRepository) {}

  async registrar(inscripcionId: string, nota: number, observacion: string = "") {
    // 1. Validar que la nota sea lógica (0 a 100)
    if (nota < 0 || nota > 100) {
      throw new Error("La nota debe estar entre 0 y 100.");
    }

    // 2. Verificar que el alumno no tenga ya una nota para esta inscripción
    const existe = await this.calificacionRepository.obtenerPorInscripcion(inscripcionId);
    if (existe) {
      throw new Error("El alumno ya tiene una calificación registrada para esta inscripción.");
    }

    // 3. Crear el objeto con tu constructor estricto
    const nuevaCalificacion = new Calificacion({
      inscripcion_id: inscripcionId,
      nota: nota,
      observacion: observacion,
      fecha_registro: new Date(),
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return await this.calificacionRepository.registrarNota(nuevaCalificacion);
  }

  async editar(id: string, nota: number, observacion: string) {
    if (nota < 0 || nota > 100) {
      throw new Error("La nota debe estar entre 0 y 100.");
    }
    return await this.calificacionRepository.actualizarNota(id, { 
      nota, 
      observacion, 
      updatedAt: new Date() 
    });
  }
}