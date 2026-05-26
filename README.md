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
Nota: se contempla roles multiples por usuario y seleccion de rol activo en login.

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

## Clonado del repositorio
```bash
git clone https://github.com/elunboundfiremail/WebAppAcademico
cd WebAppAcademico
```

## Arquitectura
Arquitectura limpia con capas:
- domain: entidades y reglas
- application: casos de uso
- infrastructure: base de datos, servicios externos
- interfaces: controladores y rutas

## Base de datos 
### Tablas principales
- usuarios: id, nombre, apellido, correo, ci, password_hash, telefono, activo, fecha_baja, creado_en
- roles: id, nombre
- usuarios_roles: usuario_id, rol_id
- carreras: id, nombre, descripcion, activo, fecha_baja
- materias: id, carrera_id, codigo, nombre, descripcion, activo, fecha_baja
- cursos: id, materia_id, docente_id, periodo, gestion, cupo, activo, fecha_baja
- curso_horarios: id, curso_id, dia_semana, hora_inicio, hora_fin, aula
- inscripciones: id, estudiante_id, curso_id, fecha_inscripcion, estado, activo
- calificaciones: id, inscripcion_id, nota, fecha_registro, observacion
- notificaciones: id, usuario_id, titulo, mensaje, leido, creado_en

### Indices obligatorios
- usuarios(correo) unique
- usuarios(ci) unique
- roles(nombre) unique
- usuarios_roles(usuario_id, rol_id) unique
- materias(codigo) unique
- inscripciones(estudiante_id, curso_id) unique
- calificaciones(inscripcion_id) unique
- cursos(materia_id, docente_id, periodo, gestion)
- curso_horarios(curso_id, dia_semana, hora_inicio)

### Triggers y procedimientos
- Trigger para validar solapamiento de horarios por estudiante y docente.
- Trigger para validar cupo antes de inscribir.
- Procedimientos para reportes RF12.

Nota de diseno: se usa roles multiples para un mismo usuario. Esto evita duplicar cuentas
cuando una persona es docente y estudiante a la vez. El ciclo usuarios -> cursos -> inscripciones
es funcional y no genera redundancia porque solo hay claves foraneas.

## Diagramas
### Diagrama de casos de uso (general)
```mermaid
usecaseDiagram
  actor Estudiante
  actor Docente
  actor Administrador

  usecase UC1 as "RF01 Registro de usuarios con rol"
  usecase UC2 as "RF02 Inicio de sesion y control por rol"
  usecase UC3 as "RF03 Gestion de perfiles y cambio de contrasena"
  usecase UC4 as "RF04 Gestion de cursos"
  usecase UC5 as "RF05 Inscripcion a cursos sin duplicidad"
  usecase UC6 as "RF06 Visualizacion de cursos por usuario"
  usecase UC7 as "RF07 Registro y visualizacion de calificaciones"
  usecase UC8 as "RF08 Dashboard por rol"
  usecase UC9 as "RF09 Gestion de usuarios por administrador"
  usecase UC10 as "RF10 Notificaciones"
  usecase UC11 as "RF11 Cierre de sesion"
  usecase UC12 as "RF12 Reportes PDF y Excel por rol"

  Estudiante --> UC1
  Estudiante --> UC2
  Estudiante --> UC3
  Estudiante --> UC5
  Estudiante --> UC6
  Estudiante --> UC7
  Estudiante --> UC8
  Estudiante --> UC10
  Estudiante --> UC11
  Estudiante --> UC12

  Docente --> UC2
  Docente --> UC3
  Docente --> UC6
  Docente --> UC7
  Docente --> UC8
  Docente --> UC10
  Docente --> UC11
  Docente --> UC12

  Administrador --> UC1
  Administrador --> UC2
  Administrador --> UC3
  Administrador --> UC4
  Administrador --> UC6
  Administrador --> UC8
  Administrador --> UC9
  Administrador --> UC10
  Administrador --> UC11
  Administrador --> UC12
```

### Diagrama ER
```mermaid
erDiagram
  USUARIOS ||--o{ USUARIOS_ROLES : tiene
  ROLES ||--o{ USUARIOS_ROLES : asigna
  CARRERAS ||--o{ MATERIAS : incluye
  MATERIAS ||--o{ CURSOS : ofrece
  USUARIOS ||--o{ CURSOS : dicta
  CURSOS ||--o{ CURSO_HORARIOS : tiene
  USUARIOS ||--o{ INSCRIPCIONES : realiza
  CURSOS ||--o{ INSCRIPCIONES : recibe
  INSCRIPCIONES ||--o| CALIFICACIONES : genera
  USUARIOS ||--o{ NOTIFICACIONES : recibe

  USUARIOS {
    int id
    string nombre
    string apellido
    string correo
    string ci
    string password_hash
    string telefono
    boolean activo
    date fecha_baja
    datetime creado_en
  }
  ROLES {
    int id
    string nombre
  }
  USUARIOS_ROLES {
    int usuario_id
    int rol_id
  }
  CARRERAS {
    int id
    string nombre
    string descripcion
    boolean activo
    date fecha_baja
  }
  MATERIAS {
    int id
    int carrera_id
    string codigo
    string nombre
    string descripcion
    boolean activo
    date fecha_baja
  }
  CURSOS {
    int id
    int materia_id
    int docente_id
    string periodo
    string gestion
    int cupo
    boolean activo
    date fecha_baja
  }
  CURSO_HORARIOS {
    int id
    int curso_id
    string dia_semana
    time hora_inicio
    time hora_fin
    string aula
  }
  INSCRIPCIONES {
    int id
    int estudiante_id
    int curso_id
    datetime fecha_inscripcion
    string estado
    boolean activo
  }
  CALIFICACIONES {
    int id
    int inscripcion_id
    decimal nota
    datetime fecha_registro
    string observacion
  }
  NOTIFICACIONES {
    int id
    int usuario_id
    string titulo
    string mensaje
    boolean leido
    datetime creado_en
  }
```

### Diagrama EER (usuarios y roles)
```mermaid
classDiagram
  class Usuario {
    +id : int
    +nombre : string
    +apellido : string
    +correo : string
  }
  class Rol {
    +id : int
    +nombre : string
  }
  class UsuarioRol {
    +usuario_id : int
    +rol_id : int
    +fecha_asignacion : datetime
    +activo : boolean
  }
  Usuario "1" -- "0..*" UsuarioRol : tiene
  Rol "1" -- "0..*" UsuarioRol : asigna
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
  A-->>F: token y roles
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
