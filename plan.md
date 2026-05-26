# Plan de trabajo 

## Reglas
- Codigo y comentarios en espanol, sin acentos, sin emojis, sin texto informal.
- Comentarios solo informativos y necesarios.
- Nivel academico, sin soluciones avanzadas.

## Estructura de carpetas propuesta
En la raiz `WebAppAcademico`:
- `01-codigo`  (solo codigo formal)
- `02-interno`  (plan, notas internas, soporte)
- `03-presentacion`  (diapositivas)
- `documento_oficial`  (documento final del proyecto, sin numeracion)

> Solo `documento_oficial` contiene el documento final. Todo lo interno va en `02-interno`.

## Bloques de trabajo (no fragmentar)

### Bloque A - Base del backend (hoy)
- Crear estructura limpia en `01-codigo\backend`:
  - `src\domain`
  - `src\application`
  - `src\infrastructure`
  - `src\interfaces`
- Configuracion minima de TypeScript y scripts.
**Estado:** completado.

### Bloque A2 - Base del frontend (esta semana)
- Crear `01-codigo\frontend` (Vue 3 + TypeScript)
- Configurar rutas basicas y layout general por rol
- Maquetar con Stitch o AI Studio las pantallas base

### Bloque B - Modulo Usuarios y Seguridad (jueves)
- RF01 Registro de usuarios
- RF02 Inicio de sesion
- RF03 Gestion de perfiles
- RF11 Cierre de sesion

### Bloque C - Modulo Academico (viernes)
- RF04 Gestion de cursos
- RF05 Inscripcion a cursos
- RF06 Visualizacion de cursos
- RF07 Registro de calificaciones
- RF08 Dashboard

### Bloque D - Reportes y Reglas (sabado)
- RF12 Reportes PDF/Excel
- Reglas: evitar duplicidad y solapamiento de horarios
- RF10 Notificaciones

### Bloque E - Documento oficial y presentacion (domingo)
- Documento final en `documento_oficial`
- Presentacion en `03-presentacion`

## Distribucion por bloques (4 personas)
- Persona A: Bloque A + coordinacion
- Persona B: Bloque B
- Persona C: Bloque C
- Persona D: Bloque D y apoyo en Bloque E

## Plan de trabajo senior (kanban y secuencial)
### Roles
- Lead : define prioridades, revisa PR, integra cambios.
- Dev 1 (junior): backend usuarios y seguridad.
- Dev 2 (junior): backend academico y reglas.
- Dev 3 (junior): frontend y maquetacion.
- Dev 4 (junior): reportes, documentacion y soporte.

### Kanban (columnas)
Backlog | Por hacer | En progreso | En revision | Hecho

### Tareas secuenciales por etapa
#### Etapa 1 - Base y preparacion
1. Crear estructura backend limpia.
2. Crear estructura frontend (Vue 3 + TS) y layout base.
3. Definir entidades y repositorios base.
4. Definir estructura de reportes RF12.
Responsables:
- Dev 1: 1
- Dev 3: 2
- Dev 2: 3
- Dev 4: 4

#### Etapa 2 - Modulo usuarios y seguridad
1. Registro y login.
2. Perfil y cambio de contrasena.
3. Roles y cierre de sesion.
Responsables:
- Dev 1: 1, 2, 3
- Lead: revisa y aprueba.

#### Etapa 3 - Modulo academico
1. Cursos (crear, editar, eliminar).
2. Inscripcion y validacion de duplicidad.
3. Calificaciones y dashboard.
Responsables:
- Dev 2: 1, 2, 3
- Lead: revisa y aprueba.

#### Etapa 4 - Frontend y maquetacion
1. Maquetar login, registro, dashboard, cursos, calificaciones.
2. Integrar consumo de endpoints.
3. Validaciones visuales.
Responsables:
- Dev 3: 1, 2, 3
- Lead: revisa y aprueba.

#### Etapa 5 - Reportes y reglas
1. Reportes PDF.
2. Reportes Excel.
3. Reglas de solapamiento de horarios.
4. Notificaciones.
Responsables:
- Dev 4: 1, 2, 4
- Dev 2: 3
- Lead: revisa y aprueba.

#### Etapa 6 - Integracion, pruebas y despliegue local
1. Integracion backend y frontend.
2. Pruebas basicas por rol.
3. README de ejecucion y variables de entorno.
4. Demo local funcionando y capturas.
Responsables:
- Lead: 1, 3
- Dev 1: 2
- Dev 3: 1, 4
- Dev 4: 4

## Aportes diarios obligatorios
Todos aportan cada dia con cambios pequenos pero reales.
- Minimo por persona: 1 commit diario o 1 PR con cambios claros.
- Si alguien termina su bloque, apoya al siguiente bloque o documentacion.

## Plan diario detallado (lunes a domingo)
### Lunes
- A:
  - crear estructura limpia en `01-codigo\backend\src`
  - agregar `tsconfig.json` y scripts en `package.json`
  - crear `src\index.ts`, `src\infrastructure\http\app.ts`, `src\interfaces\routes\index.ts`
- A2:
  - crear `01-codigo\frontend`
  - definir estructura `src\pages`, `src\components`, `src\services`
- B:
  - crear entidad `Usuario` en `src\domain\entities`
  - crear interfaz `RepositorioUsuario` en `src\domain\repositories`
  - definir dto basicos de registro/login
- C:
  - crear entidad `Curso` en `src\domain\entities`
  - crear entidad `Inscripcion` en `src\domain\entities`
  - definir reglas de duplicidad en comentarios de dominio
- D:
  - listar reportes RF12 y definir estructura de salida (campos)
  - crear archivo de consultas base en `02-interno`

### Martes
- A:
  - crear caso de uso `RegistrarUsuario`
  - crear caso de uso `IniciarSesion`
  - crear controlador y ruta `/auth/register` y `/auth/login`
- A2:
  - maquetar pantalla login y registro
  - crear layout base del dashboard
- B:
  - crear caso de uso `VerPerfil` y `EditarPerfil`
  - crear ruta `/perfil` (get/put)
  - agregar validacion basica (campos requeridos)
- C:
  - crear caso de uso `ListarCursosPorUsuario`
  - crear ruta `/cursos` (get)
  - crear ruta `/cursos/:id` (get detalle)
- D:
  - agregar libreria PDF y crear servicio `ReportePdfService`
  - generar reporte `listado_materias_por_carrera`

### Miercoles
- A:
  - agregar middleware de roles
  - crear ruta `/auth/logout`
  - crear caso de uso `CerrarSesion`
- A2:
  - maquetar perfil y cambio de contrasena
  - agregar validaciones visuales basicas
- B:
  - crear caso de uso `CambiarContrasena`
  - agregar ruta `/perfil/password`
- C:
  - crear caso de uso `InscribirCurso`
  - validar duplicidad (mismo estudiante y curso)
  - crear ruta `/inscripciones` (post)
- D:
  - agregar libreria Excel y crear servicio `ReporteExcelService`
  - generar reporte `notas_por_curso`

### Jueves
- A:
  - integrar repositorios en infraestructura (mock o memoria)
  - ajustar controladores segun casos de uso
- A2:
  - maquetar cursos e inscripciones
  - integrar consumo de endpoints (mock)
- B:
  - pruebas basicas manuales del modulo usuarios
  - corregir validaciones
- C:
  - crear caso de uso `RegistrarCalificacion`
  - crear ruta `/calificaciones` (post/put)
  - crear endpoint `dashboard` por rol
- D:
  - implementar validacion de solapamiento de horarios
  - documentar regla en `02-interno`

### Viernes
- A:
  - revisar rutas y estados http
  - limpiar mensajes de error
- A2:
  - maquetar calificaciones y dashboard
  - integrar notificaciones en UI
- B:
  - correcciones de perfiles y sesiones
- C:
  - correcciones de cursos/inscripciones/calificaciones
- D:
  - crear servicio de notificaciones basicas
  - ruta `/notificaciones` (get)

### Sabado
- A:
  - apoyo a documento oficial (estructura y capturas)
- A2:
  - capturas del frontend para el documento oficial
- B:
  - apoyo a documento oficial (casos de uso)
- C:
  - apoyo a documento oficial (diagramas y modulos)
- D:
  - cierre de reportes RF12 restantes

### Domingo
- Todo el equipo:
  - documento oficial completo en `documento_oficial`
  - presentacion final en `03-presentacion`

## Proceso completo por etapas (hasta despliegue)
### Etapa 1 - Preparacion y base
- A: estructura limpia y scripts (ya listo)
- A2: estructura base frontend
- B: entidades y repositorios base
- C: entidades academicas base
- D: lista de reportes y formato de salida
Salida: backend y frontend base listos.

### Etapa 2 - Desarrollo por modulos
- A: autenticacion y sesiones
- A2: pantallas login, registro, dashboard, cursos, calificaciones
- B: perfiles y contrasena
- C: cursos, inscripciones, calificaciones, dashboard
- D: reportes PDF/Excel y reglas
Salida: endpoints y pantallas funcionales.

### Etapa 3 - Integracion y pruebas
- A: integra repositorios y middleware
- A2: integra servicios frontend con backend
- B: valida flujo de usuarios
- C: valida flujo academico
- D: valida reportes y reglas
Salida: sistema integrado front y back.

### Etapa 4 - Documentacion y presentacion
- A: estructura del documento oficial
- B: casos de uso e historias
- C: diagramas y modulos
- D: calidad ISO 25010 y pruebas
Salida: documento oficial y presentacion completos.

### Etapa 5 - Despliegue (demo local)
- A: prepara `README` de ejecucion
- A2: script de ejecucion del frontend y build
- B: define variables de entorno y archivo `.env.example`
- C: configura base de datos de prueba
- D: valida inicio y genera evidencias (capturas)
Salida: demo local con frontend y backend.

## Esquema base de datos propuesto (version inicial)
### Tablas principales
- usuarios: id, nombre, apellido, correo, ci, password_hash, rol, telefono, activo, fecha_baja, creado_en
- carreras: id, nombre, descripcion, activo, fecha_baja
- materias: id, carrera_id, codigo, nombre, descripcion, activo, fecha_baja
- estudiantes: id, usuario_id, carrera_id, activo, fecha_baja
- docentes: id, usuario_id, activo, fecha_baja
- cursos: id, materia_id, docente_id, periodo, gestion, cupo, activo, fecha_baja
- curso_horarios: id, curso_id, dia_semana, hora_inicio, hora_fin, aula
- inscripciones: id, estudiante_id, curso_id, fecha_inscripcion, estado, activo
- calificaciones: id, inscripcion_id, nota, fecha_registro, observacion
- notificaciones: id, usuario_id, titulo, mensaje, leido, creado_en

### Relaciones clave (FK)
- materias.carrera_id -> carreras.id
- estudiantes.usuario_id -> usuarios.id
- estudiantes.carrera_id -> carreras.id
- docentes.usuario_id -> usuarios.id
- cursos.materia_id -> materias.id
- cursos.docente_id -> docentes.id
- curso_horarios.curso_id -> cursos.id
- inscripciones.estudiante_id -> estudiantes.id
- inscripciones.curso_id -> cursos.id
- calificaciones.inscripcion_id -> inscripciones.id
- notificaciones.usuario_id -> usuarios.id

### Indices obligatorios
- usuarios(correo) unique
- usuarios(ci) unique
- materias(codigo) unique
- inscripciones(estudiante_id, curso_id) unique
- calificaciones(inscripcion_id) unique
- cursos(materia_id, docente_id, periodo, gestion)
- curso_horarios(curso_id, dia_semana, hora_inicio)

### Reglas y validaciones
- Evitar duplicidad: indices unique en usuarios, materias, inscripciones.
- Evitar solapamiento: validar horarios por estudiante y por docente.
- Evitar cupo negativo: no permitir inscripcion si cupo <= inscritos.

### Triggers recomendados
- Antes de insertar inscripciones: validar cupo y solapamiento de estudiante.
- Antes de insertar curso_horarios: validar solapamiento del docente.
- (Opcional) auditoria de cambios en usuarios, materias y cursos.

### Procedimientos recomendados (opcionales)
- Reportes RF12: consultas de materias por carrera, notas por alumno, notas por curso,
  historial academico y listados por rol.
- Reporte de disponibilidad de cursos por periodo.

### Cobertura de requisitos
- RF01-RF03, RF09, RF11: usuarios, roles y perfiles.
- RF04-RF08: carreras, materias, cursos, inscripciones, calificaciones, dashboard.
- RF10: notificaciones.
- RF12: reportes con consultas sobre cursos, inscripciones y calificaciones.

## Prerequisitos y versionado
### Prerequisitos tecnicos oficiales (instalar todos)
- Sistema operativo: Windows 10/11
- Node.js LTS 20.x y npm (incluido)
- Git 2.45+
- PostgreSQL 18
- Editor: Visual Studio Code (estable)
- Navegador: Firefox (ultimo estable)

### Lenguajes y frameworks acordados
- Backend: Node.js + Express + TypeScript
- Frontend: Vue 3 + TypeScript (Vite)
- Base de datos: PostgreSQL 16

### Programas y extensiones recomendadas
- VS Code extensiones:
  - ESLint
  - Prettier
  - GitLens (opcional)
  - Vue Language Features (Volar)
  - TypeScript Vue Plugin (Volar)

### Configuracion inicial estandar (todos iguales)
- Configurar git:
  - `git config user.name "Nombre Apellido"`
  - `git config user.email "correo@dominio.com"`
- Clonar repo en carpeta local del proyecto
- Crear archivo `.env` desde `.env.example`
- Instalar dependencias:
  - Backend: `cd 01-codigo\backend` y `npm install`
  - Frontend: `cd 01-codigo\frontend` y `npm install`
- Ejecutar:
  - Backend: `npm run dev`
  - Frontend: `npm run dev`

### Reglas de versionado
- Cada integrante configura su usuario en git:
  - `git config user.name "Nombre Apellido"`
  - `git config user.email "correo@dominio.com"`
- Flujo simple:
  - Rama `main` protegida, trabajo en ramas cortas por bloque
  - Nombres de rama: `bloque-b-usuarios`, `bloque-c-academico`, etc.
- Mensajes de commit claros y cortos:
  - `feat: registro de usuarios`
  - `fix: validacion de login`
- No incluir `Co-authored-by: Copilot` en commits
- Los pushes finales los hace cada integrante con su usuario

## Politica de commits y autoria
- Commits y pushes los hace cada integrante con su usuario de GitHub.
- No incluir `Co-authored-by: Copilot u otra ia.
- Si yo genero cambios, tu haces el commit manual con tu usuario.

## Proximo paso inmediato
- Iniciar Bloque B (usuarios y seguridad).
