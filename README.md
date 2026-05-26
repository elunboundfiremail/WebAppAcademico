# Sistema web academico 

- Universidad: UPDS
- Carrera: ING.  SISTEMAS
- Materia: Programacion IV
- Docente: Ph. D. Luigi Antequera Tamari
- Titulo: Sistema web academico con enfoque en calidad y arquitectura
- Grupo: 4
- Integrantes:
  - Integrante 1: Cristian	
  - Integrante 2: Diego
  - Integrante 3: Jonathan
  - Integrante 4: Michael
- Fecha:

## Resumen del avance
- Estructura base del backend creada.
- Plan de trabajo con roles y kanban definido.
- Prerequisitos tecnicos y versionado definidos.
- Esquema de base de datos propuesto y validado contra RF01-RF12.

## Requisitos funcionales 
- RF01 Registro de usuarios con rol.
- RF02 Inicio de sesion y control por rol.
- RF03 Gestion de perfiles y cambio de contrasena.
- RF04 Gestion de cursos.
- RF05 Inscripcion a cursos sin duplicidad.
- RF06 Visualizacion de cursos por usuario.
- RF07 Registro y visualizacion de calificaciones.
- RF08 Dashboard por rol.
- RF09 Gestion de usuarios por administrador.
- RF10 Notificaciones.
- RF11 Cierre de sesion.
- RF12 Reportes PDF y Excel por rol.

Nota importante: el alumno no registra notas, solo consulta sus calificaciones.

## Tecnologias usadas
- Backend: Node.js + Express + TypeScript.
- Frontend: Vue 3 + TypeScript (Vite).
- Base de datos: PostgreSQL 16.

## Prerequisitos oficiales
- Windows 10/11
- Node.js LTS 20.x
- Git 2.45+
- PostgreSQL 16.x
- Visual Studio Code
- Chrome o Edge

## Arquitectura
Arquitectura limpia con capas:
- domain: entidades y reglas
- application: casos de uso
- infrastructure: base de datos, servicios externos
- interfaces: controladores y rutas

## Base de datos 
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

### Indices obligatorios
- usuarios(correo) unique
- usuarios(ci) unique
- materias(codigo) unique
- inscripciones(estudiante_id, curso_id) unique
- calificaciones(inscripcion_id) unique
- cursos(materia_id, docente_id, periodo, gestion)
- curso_horarios(curso_id, dia_semana, hora_inicio)

### Triggers y procedimientos
- Trigger para validar solapamiento de horarios por estudiante y docente.
- Trigger para validar cupo antes de inscribir.
- Procedimientos para reportes RF12.

## Diagramas
### Diagrama de casos de uso (general)
```mermaid
flowchart LR
  A[Estudiante] --> UC1((Registro))
  A --> UC2((Login))
  A --> UC6((Ver cursos))
  A --> UC7((Ver calificaciones))
  A --> UC10((Recibir notificaciones))
  A --> UC12((Reportes alumno))

  D[Docente] --> UC2
  D --> UC7
  D --> UC10
  D --> UC12

  M[Administrador] --> UC1
  M --> UC2
  M --> UC4((Gestion cursos))
  M --> UC9((Gestion usuarios))
  M --> UC10
  M --> UC12
```

### Diagrama ER
```mermaid
erDiagram
  USUARIOS ||--o{ ESTUDIANTES : tiene
  USUARIOS ||--o{ DOCENTES : tiene
  CARRERAS ||--o{ MATERIAS : incluye
  MATERIAS ||--o{ CURSOS : ofrece
  DOCENTES ||--o{ CURSOS : dicta
  CURSOS ||--o{ CURSO_HORARIOS : tiene
  ESTUDIANTES ||--o{ INSCRIPCIONES : realiza
  CURSOS ||--o{ INSCRIPCIONES : recibe
  INSCRIPCIONES ||--|| CALIFICACIONES : genera
  USUARIOS ||--o{ NOTIFICACIONES : recibe

  USUARIOS {
    int id
    string nombre
    string apellido
    string correo
    string ci
    string password_hash
    string rol
    boolean activo
  }
```

### Diagrama EER (especializacion de usuarios)
```mermaid
classDiagram
  class Usuario {
    +id
    +nombre
    +apellido
    +correo
    +rol
  }
  class Estudiante
  class Docente
  class Administrador
  Usuario <|-- Estudiante
  Usuario <|-- Docente
  Usuario <|-- Administrador
```

### Diagramas de secuencia
#### RF01 Registro de usuarios
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  U->>F: completa formulario
  F->>A: POST /auth/register
  A->>BD: insertar usuario
  BD-->>A: ok
  A-->>F: respuesta
  F-->>U: confirmacion
```

#### RF02 Inicio de sesion
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  U->>F: ingresa credenciales
  F->>A: POST /auth/login
  A->>BD: validar usuario
  BD-->>A: ok
  A-->>F: token y rol
  F-->>U: acceso por rol
```

#### RF03 Gestion de perfiles
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  U->>F: edita perfil
  F->>A: PUT /perfil
  A->>BD: actualizar datos
  BD-->>A: ok
  A-->>F: perfil actualizado
```

#### RF04 Gestion de cursos
```mermaid
sequenceDiagram
  actor M as Administrador
  participant F as Frontend
  participant A as API
  participant BD as BD
  M->>F: crea curso
  F->>A: POST /cursos
  A->>BD: insertar curso
  BD-->>A: ok
  A-->>F: curso creado
```

#### RF05 Inscripcion a cursos
```mermaid
sequenceDiagram
  actor E as Estudiante
  participant F as Frontend
  participant A as API
  participant BD as BD
  E->>F: solicita inscripcion
  F->>A: POST /inscripciones
  A->>BD: validar cupo y duplicidad
  BD-->>A: ok
  A-->>F: inscripcion confirmada
```

#### RF06 Visualizacion de cursos
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  U->>F: ver cursos
  F->>A: GET /cursos
  A->>BD: consultar cursos por rol
  BD-->>A: lista
  A-->>F: lista
```

#### RF07 Registro de calificaciones
```mermaid
sequenceDiagram
  actor D as Docente
  participant F as Frontend
  participant A as API
  participant BD as BD
  D->>F: registrar nota
  F->>A: POST /calificaciones
  A->>BD: insertar calificacion
  BD-->>A: ok
  A-->>F: confirmacion
```

#### RF08 Dashboard
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  U->>F: abrir dashboard
  F->>A: GET /dashboard
  A->>BD: consultar resumen
  BD-->>A: datos
  A-->>F: resumen
```

#### RF09 Gestion de usuarios
```mermaid
sequenceDiagram
  actor M as Administrador
  participant F as Frontend
  participant A as API
  participant BD as BD
  M->>F: crear usuario
  F->>A: POST /usuarios
  A->>BD: insertar usuario
  BD-->>A: ok
  A-->>F: confirmacion
```

#### RF10 Notificaciones
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  participant BD as BD
  A->>BD: registrar notificacion
  BD-->>A: ok
  U->>F: ver notificaciones
  F->>A: GET /notificaciones
  A->>BD: consultar notificaciones
  BD-->>A: lista
  A-->>F: lista
```

#### RF11 Cierre de sesion
```mermaid
sequenceDiagram
  actor U as Usuario
  participant F as Frontend
  participant A as API
  U->>F: cerrar sesion
  F->>A: POST /auth/logout
  A-->>F: ok
  F-->>U: sesion cerrada
```

## Politica de contribucion
- Commits y pushes los realiza cada integrante con su usuario.
- No usar "Co-authored-by: Copilot" en los commits.
- La lista de contributors la genera GitHub segun los commits en el repo.

