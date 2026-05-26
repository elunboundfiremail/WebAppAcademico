# Estructura de salida para reportes academicos RF12

## 1. Listado de materias por carrera (Administrador)
- Filtro primario: carrera_id (UUID)
- Campos de salida:
  - codigo_carrera
  - nombre_carrera
  - codigo_materia
  - nombre_materia
  - semestre_materia

## 2. Notas por curso de todos los alumnos (Docente)
- Filtro primario: curso_id (UUID)
- Campos de salida:
  - codigo_curso
  - nombre_materia
  - primer_nombre_estudiante
  - apellido_paterno_estudiante
  - nota_decimal
  - estado_calificacion
  - observaciones

## 3. Historial academico del alumno (Estudiante)
- Filtro primario: estudiante_id (UUID)
- Campos de salida:
  - nombre_completo_estudiante
  - codigo_materia
  - nombre_materia
  - periodo_curso
  - gestion_curso
  - nota_final
  - estado_calificacion