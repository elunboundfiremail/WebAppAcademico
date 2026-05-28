import { IInscripcionRepository } from '../../../domain/repositories/inscripcion.repository';
import { Inscripcion } from '../../../domain/entities/inscripcion';

export class GestionInscripcionesUseCase {
  constructor(private inscripcionRepository: IInscripcionRepository) {}

  async inscribir(estudianteId: string, cursoId: string) {
    // 1. Validar duplicidad (RF05)
    const existeDuplicado = await this.inscripcionRepository.verificarDuplicidad(estudianteId, cursoId);
    if (existeDuplicado) {
      throw new Error("El estudiante ya está inscrito en este curso.");
    }

    // 2. Validar solapamiento de horarios (Consideración clave)
    const haySolapamiento = await this.inscripcionRepository.verificarSolapamiento(estudianteId, cursoId);
    if (haySolapamiento) {
      throw new Error("Existe un choque de horarios con otra materia inscrita.");
    }

    // 3. Si pasa las validaciones, creamos la inscripción usando tu constructor
    const nuevaInscripcion = new Inscripcion({
      estudiante_id: estudianteId,
      curso_id: cursoId,
      estado: 'ACTIVA',
      fecha_inscripcion: new Date(),
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return await this.inscripcionRepository.crearInscripcion(nuevaInscripcion);
  }
}