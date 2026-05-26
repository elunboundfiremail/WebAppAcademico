# SISTEMA WEB ACADEMICO 

**Universidad:** UPDS

**Carrera:** Ingenieria en Sistemas

**Materia:** Programacion IV

**Docente:** Ph. D. Luigi Antequera Tamari

**Titulo:** Desarrollo de sistema web academico con enfoque en calidad y arquitectura

**Grupo:** 4

**Integrantes:**

1. Jonathan
2. Diego
3. Maik
4. Cristian

**Fecha:** 25 de mayo de 2026



## INDICE

1. Introduccion
2. Objetivos del proyecto
3. Descripcion del sistema
4. Tecnologias y frameworks utilizados
5. Diseno de interfaz de usuario (UI/UX)
6. Arquitectura y patrones de diseno
7. Implementacion del sistema
8. Evaluacion de calidad (ISO 25010)
9. Pruebas del sistema
10. Problemas encontrados
11. Propuestas de mejora
12. Conclusiones
13. Anexos



## 1. INTRODUCCION

Una institucion educativa requiere modernizar sus procesos academicos mediante una plataforma digital que permita a estudiantes y docentes gestionar informacion de manera eficiente. El sistema web academico propuesto busca resolver problemas como interfaces poco intuitivas, errores frecuentes en sistemas legados y dificultad para escalar soluciones existentes.

La plataforma facilita la gestion integrada de usuarios, cursos, inscripciones, calificaciones y reportes, considerando roles diferenciados (estudiante, docente, administrador) y reglas de negocio complejas como evitar solapamiento de horarios y validar disponibilidad de cupos.



## 2. OBJETIVOS DEL PROYECTO

### 2.1 Objetivo general

Desarrollar una plataforma educativa web integral que permita la gestion eficiente de procesos academicos, aplicando frameworks modernos, principios de diseno de interfaces, patrones de software y estandares de calidad, para ofrecer una solucion usable, escalable, segura y mantenible.

### 2.2 Objetivos especificos

- Implementar autenticacion y control de acceso basado en roles multiples.
- Desarrollar modulos de gestion de cursos, inscripciones y calificaciones.
- Generar reportes en formatos PDF y Excel para diferentes roles.
- Aplicar arquitectura limpia con patrones de diseno comprobados.
- Asegurar calidad mediante evaluacion ISO 25010 y pruebas automatizadas.
- Documentar el sistema con diagramas UML y procesos de despliegue.



## 3. DESCRIPCION DEL SISTEMA

### 3.1 Contexto y usuarios

El sistema web academico sirve a tres roles principales:

- **Estudiante:** Se registra, consulta cursos disponibles, se inscribe, visualiza sus calificaciones y descarga reportes academicos.
- **Docente:** Gestiona sus cursos asignados, registra calificaciones, genera reportes de notas y consulta horarios.
- **Administrador:** Crea usuarios, gestiona carreras, materias y cursos, y monitorea la plataforma.

### 3.2 Funcionalidades principales (RF01-RF12)

- RF01: Registro de usuarios con rol (estudiante, docente, administrador).
- RF02: Inicio de sesion y seleccion de rol activo.
- RF03: Gestion de perfiles y cambio de contrasena.
- RF04: Gestion de cursos (crear, editar, eliminar).
- RF05: Inscripcion a cursos sin duplicidad.
- RF06: Visualizacion de cursos por usuario.
- RF07: Registro y visualizacion de calificaciones.
- RF08: Panel de usuario (dashboard) por rol.
- RF09: Gestion de usuarios por administrador.
- RF10: Notificaciones en tiempo real.
- RF11: Cierre de sesion seguro.
- RF12: Reportes en PDF y Excel por rol.

### 3.3 Restricciones y consideraciones

- El estudiante solo consulta calificaciones, no las registra.
- Se evita duplicidad de inscripciones a un mismo curso.
- No se permite solapamiento de horarios de estudiantes y docentes.
- Borrado logico de usuarios, carreras, materias y cursos para auditoria.
- Manejo de roles multiples: un usuario puede ser docente y estudiante simultaneamente.



## 4. TECNOLOGIAS Y FRAMEWORKS UTILIZADOS

### 4.1 Stack tecnologico

| Componente | Tecnologia | Version |
|---|---|---|
| Backend | Node.js + Express | LTS 20.x / 5.2.1 |
| Lenguaje Backend | TypeScript | 6.0.3 |
| Frontend | Vue 3 | 3.x |
| Lenguaje Frontend | TypeScript | 6.0.3 |
| Base de datos | PostgreSQL | 16.x |
| Build Frontend | Vite | 5.x |
| Herramientas | Git, npm | 2.45+ / LTS |

### 4.2 Dependencias principales

**Backend:**
- express: servidor HTTP
- ts-node-dev: desarrollo TypeScript
- typescript: compilacion

**Frontend:**
- vue: framework reactivo
- vite: build tool
- typescript: tipado

**Base de datos:**
- PostgreSQL 16: motor RDBMS



## 5. DISENO DE INTERFAZ DE USUARIO (UI/UX)

### 5.1 Principios aplicados

- **Usabilidad:** Interfaz intuitiva con flujos claros para cada rol.
- **Accesibilidad:** Soporte para navegacion por teclado y lectores de pantalla.
- **Consistencia:** Paleta de colores uniforme, tipografia estandar, componentes reutilizables.
- **Responsividad:** Adaptacion a dispositivos moviles y desktop.

### 5.2 Vistas principales

- Login con selector de rol activo.
- Dashboard personalizado por rol.
- Formularios de registro, gestion de perfiles.
- Listados de cursos, inscripciones, calificaciones.
- Modales para acciones criticas (inscribir, cambiar rol).

### 5.3 Estado

En progreso durante fase de desarrollo. Maquetacion preliminar con Stitch o AI Studio.



## 6. ARQUITECTURA Y PATRONES DE DISENO

### 6.1 Arquitectura limpia

Se implementa arquitectura limpia con cuatro capas concentricas:

```
┌─────────────────────────────────────────┐
│ Interfaces (Controladores, Rutas)       │
├─────────────────────────────────────────┤
│ Application (Casos de Uso)              │
├─────────────────────────────────────────┤
│ Domain (Entidades, Reglas)              │
├─────────────────────────────────────────┤
│ Infrastructure (BD, Servicios)          │
└─────────────────────────────────────────┘
```

- **Domain:** Entidades Usuario, Curso, Inscripcion, Calificacion, etc. Interfaces de repositorios.
- **Application:** Casos de uso RegistrarUsuario, IniciarSesion, InscribirCurso, RegistrarCalificacion, etc.
- **Infrastructure:** Implementaciones PostgreSQL, adaptadores HTTP, servicios de notificacion.
- **Interfaces:** Controladores Express, definicion de rutas, middleware de autenticacion y roles.

### 6.2 Patrones de diseno implementados

#### 6.2.1 Patron Inyeccion de Dependencias

Fundamental para garantizar que la capa Application no dependa de Infrastructure. Las dependencias (BD, servicios) se inyectan en constructores de casos de uso.

Ejemplo:
```typescript
class IniciarSesionUseCase {
  constructor(private usuarioRepository: IUsuarioRepository) {}
  
  async execute(ci: string, password: string) {
    // Logica sin conocer detalles de BD
  }
}
```

Beneficios: Desacoplamiento, pruebas unitarias sin BD, cambio de dependencias sin refactor.

#### 6.2.2 Patron Repositorio

Aísla acceso a PostgreSQL del resto de aplicacion. Domain define interfaces, Infrastructure implementa.

Ejemplo:
```typescript
// Domain
interface IUsuarioRepository {
  obtenerPorCi(ci: string): Promise<Usuario | null>;
}

// Infrastructure
class UsuarioRepositoryPostgres implements IUsuarioRepository {
  async obtenerPorCi(ci: string) {
    // Implementacion SQL
  }
}
```

Beneficios: Independencia de BD, facilita migracion futura, testeo sin DB.

#### 6.2.3 Data Transfer Object (DTO)

Valida y transporta datos entre peticiones HTTP y casos de uso.

Ejemplo:
```typescript
class RegistrarUsuarioDTO {
  constructor(
    public primerNombre: string,
    public apellidoPaterno: string,
    public correo: string,
    public ci: string,
    public rol: string
  ) {
    // Validaciones
  }
}
```

Beneficios: Validacion centralizada, separacion de concerns, contrato entre capas.

#### 6.2.4 Patron Adaptador

Desvincula sistema de framework web Express.

Ejemplo:
```typescript
class UsuarioControlador {
  constructor(private iniciarSesion: IniciarSesionUseCase) {}
  
  async login(req: Request, res: Response) {
    const input = new IniciarSesionDTO(req.body.ci, req.body.password);
    const output = await this.iniciarSesion.execute(input);
    res.json(output);
  }
}
```

Beneficios: Independencia de Express, facilita cambio de framework, logica limpia.

#### 6.2.5 Patron Unit of Work (Unidad de Trabajo)

Agrupa multiples operaciones BD en transaccion atomica.

Crítico para inscripcion a cursos: validar cupo e insertar simultaneamente.

Ejemplo:
```typescript
async inscribir(estudiante: Usuario, curso: Curso) {
  const unitOfWork = this.db.beginTransaction();
  
  try {
    const cupoDisponible = await unitOfWork.cursos.obtenerCupo(curso.id);
    if (cupoDisponible <= 0) throw new Error("Sin cupo");
    
    await unitOfWork.inscripciones.crear({
      estudiante_id: estudiante.id,
      curso_id: curso.id
    });
    
    await unitOfWork.commit();
  } catch (error) {
    await unitOfWork.rollback();
    throw error;
  }
}
```

Beneficios: Consistencia de datos, previene race conditions, auditoria transaccional.

### 6.3 Diagrama EER

Ver Anexo 1: Diagrama EER completo con todas entidades y relaciones.

### 6.4 Diagrama de casos de uso

Ver Anexo 2: Diagrama casos de uso por rol (estudiante, docente, administrador).

### 6.5 Diagrama de secuencia (login con roles multiples)

Ver Anexo 3: Diagrama secuencia RF02 mostrando selector de rol activo.



## 7. IMPLEMENTACION DEL SISTEMA

### 7.1 Estructura del proyecto

```
WebAppAcademico/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   └── repositories/
│   ├── application/
│   │   ├── use-cases/
│   │   └── dtos/
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── repositories/
│   │   └── migrations/
│   └── interfaces/
│       ├── controllers/
│       ├── routes/
│       └── middleware/
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts (frontend)
├── README.md
└── dokumentacion/
    └── documento_formal.md
```

**Nota:** El repositorio contiene SOLO código fuente y README. Las carpetas `01-codigo`, `02-interno`, `03-presentacion` son SOLO para uso local del equipo, no se suben a GitHub.

### 7.2 Organizacion del codigo

**Domain:** Entidades, interfaces de repositorios, reglas de negocio.

**Application:** Casos de uso, DTOs, interfaces de servicios.

**Infrastructure:** Implementacion PostgreSQL, conexion, migraciones.

**Interfaces:** Controladores Express, rutas, middleware.

### 7.3 Modulos principales

- Autenticacion y sesiones.
- Gestion de usuarios y perfiles.
- Gestion de carreras, materias, cursos.
- Inscripciones y validaciones.
- Calificaciones y dashboard.
- Reportes PDF/Excel.
- Notificaciones.



## 8. EVALUACION DE CALIDAD (ISO 25010)

### 8.1 Atributos de calidad

| Atributo | Criterio | Estado |
|---|---|---|
| Funcionalidad | RF01-RF12 implementados y testeados | En progreso |
| Confiabilidad | Manejo de errores, transacciones ACID | En progreso |
| Usabilidad | Interfaz intuitiva, accesibilidad | En progreso |
| Eficiencia | Tiempos respuesta < 2s | En progreso |
| Mantenibilidad | Codigo limpio, documentacion | En progreso |
| Portabilidad | Multi-plataforma, contenedores | En progreso |

### 8.2 Estado

Evaluacion pendiente durante fase de testing.



## 9. PRUEBAS DEL SISTEMA

### 9.1 Tipos de pruebas planificadas

- **Unitarias:** Casos de uso y repositorios sin BD.
- **Integracion:** Casos de uso con BD real en ambiente test.
- **Funcionales:** Flujos completos por rol (RF01-RF12).
- **No funcionales:** Rendimiento, seguridad, accesibilidad.

### 9.2 Cobertura

Objetivo: minimo 70% de cobertura de casos de uso criticos.

### 9.3 Estado

En progreso. Plan de testing en ejecucion.



## 10. PROBLEMAS ENCONTRADOS

### 10.1 Problemas tecnicos

Pendiente documentacion durante desarrollo y testing.

### 10.2 Problemas de diseno

Pendiente identificacion durante arquitectura.

### 10.3 Problemas de equipo

Pendiente documentacion de lecciones aprendidas.

### 10.4 Reflexion critica

En progreso.



## 11. PROPUESTAS DE MEJORA

### 11.1 Mejoras tecnicas

- Implementar cache Redis para consultas frecuentes.
- Agregar busqueda full-text para cursos y materias.
- Optimizar consultas de reportes con indices adicionales.

### 11.2 Mejoras en UI

- Temas claros/oscuros.
- Notificaciones en tiempo real con WebSockets.
- Graficos de desempeno academico.

### 11.3 Mejoras en calidad

- Aumentar cobertura de tests a 90%.
- Implementar CI/CD con GitHub Actions.
- Auditoria de seguridad externa.



## 12. CONCLUSIONES

### 12.1 Resultados del proyecto

Estado: En desarrollo.

El sistema web academico implementa arquitectura limpia con patrones comprobados, soporta roles multiples y provee funcionalidades integrales para gestion academica escalable.

### 12.2 Aprendizajes obtenidos

- Importancia de arquitectura limpia en proyectos academicos.
- Patrones de diseno esenciales para mantenibilidad.
- Gestionar complejidad con roles y reglas de negocio.

### 12.3 Valor del sistema

Solucion escalable, segura y usable para institucion educativa.

### 12.4 Evaluacion del trabajo realizado

Equipo colaborativo con entregas secuenciales. Kanban utilizado para seguimiento. Rol multiple de usuarios implementado correctamente.



## 13. ANEXOS

### Anexo 1: Diagrama ER

[Ver diagrama ER en README.md del repositorio]

### Anexo 2: Diagrama EER

[Ver diagrama EER completo en README.md del repositorio]

### Anexo 3: Diagrama de casos de uso

[Ver diagrama de casos de uso en README.md del repositorio]

### Anexo 4: Diagrama de secuencia (RF02 Login)

[Ver diagrama de secuencia en README.md del repositorio]

### Anexo 5: Enlaces

- Repositorio GitHub: https://github.com/elunboundfiremail/WebAppAcademico
- Kanban: kanban.md

### Anexo 6: Stack tecnologico

- Node.js LTS 20.x
- Express 5.2.1
- TypeScript 6.0.3
- Vue 3
- PostgreSQL 16
- Git 2.45+
