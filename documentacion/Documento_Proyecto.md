# SISTEMA WEB ACADEMICO

**Universidad:** UPDS  
**Carrera:** Ingeniería en Sistemas  
**Materia:** Programación IV  
**Docente:** Ph.D. Luigi Antequera Tamari  
**Título:** Desarrollo de sistema web académico con enfoque en calidad y arquitectura  
**Grupo:** 4  
**Integrantes:**
1. Jonathan
2. Diego
3. Maik
4. Cristian

**Fecha:** 26 de mayo de 2026

---

## ÍNDICE

1. Introducción
2. Objetivos del proyecto
3. Descripción del sistema
4. Tecnologías y frameworks utilizados
5. Diseño de interfaz de usuario (UI/UX)
6. Arquitectura y patrones de diseño
7. Implementación del sistema
8. Evaluación de calidad (ISO 25010)
9. Pruebas del sistema
10. Problemas encontrados
11. Propuestas de mejora
12. Conclusiones
13. Anexos

---

## 1. INTRODUCCIÓN

Una institución educativa requiere modernizar sus procesos académicos mediante una plataforma digital que permita a estudiantes y docentes gestionar información de manera eficiente. El sistema web académico propuesto busca resolver problemas como interfaces poco intuitivas, errores frecuentes en sistemas legados y dificultad para escalar soluciones existentes.

La plataforma facilita la gestión integrada de usuarios, cursos, inscripciones, calificaciones y reportes, considerando roles diferenciados (estudiante, docente, administrador) y reglas de negocio complejas como evitar solapamiento de horarios, validar disponibilidad de cupos y gestionar roles múltiples.

---

## 2. OBJETIVOS DEL PROYECTO

### 2.1 Objetivo general

Desarrollar una plataforma educativa web integral que permita la gestión eficiente de procesos académicos, aplicando frameworks modernos, principios de diseño de interfaces, patrones de software comprobados y estándares de calidad, para ofrecer una solución usable, escalable, segura y mantenible.

### 2.2 Objetivos específicos

- Implementar autenticación y control de acceso basado en roles múltiples.
- Desarrollar módulos de gestión de cursos, inscripciones y calificaciones.
- Generar reportes en formatos PDF y Excel para diferentes roles.
- Aplicar arquitectura limpia con patrones de diseño comprobados (5 patrones).
- Asegurar calidad mediante evaluación ISO 25010 y pruebas automatizadas.
- Documentar el sistema con diagramas UML, estructura estándar y procesos de despliegue.

---

## 3. DESCRIPCIÓN DEL SISTEMA

### 3.1 Contexto y usuarios

El sistema web académico sirve a tres roles principales:

- **Estudiante:** Se registra, consulta cursos disponibles, se inscribe, visualiza sus calificaciones y descarga reportes académicos.
- **Docente:** Gestiona sus cursos asignados, registra calificaciones, genera reportes de notas y consulta horarios.
- **Administrador:** Crea usuarios, gestiona carreras, materias y cursos, y monitorea la plataforma.

### 3.2 Funcionalidades principales (RF01-RF12)

- **RF01:** Registro de usuarios con rol (estudiante, docente, administrador).
- **RF02:** Inicio de sesión y selección de rol activo (roles múltiples).
- **RF03:** Gestión de perfiles y cambio de contraseña.
- **RF04:** Gestión de cursos (crear, editar, eliminar).
- **RF05:** Inscripción a cursos sin duplicidad y validación de cupos.
- **RF06:** Visualización de cursos por usuario (inscritos).
- **RF07:** Registro y visualización de calificaciones.
- **RF08:** Panel de usuario (dashboard) personalizado por rol.
- **RF09:** Gestión de usuarios por administrador.
- **RF10:** Notificaciones en tiempo real.
- **RF11:** Cierre de sesión seguro.
- **RF12:** Reportes en PDF y Excel por rol.

### 3.3 Restricciones y consideraciones

- El estudiante solo consulta calificaciones, no las registra.
- Se evita duplicidad de inscripciones a un mismo curso.
- No se permite solapamiento de horarios de estudiantes y docentes.
- Borrado lógico de usuarios, carreras, materias y cursos para auditoría.
- Manejo de roles múltiples: un usuario puede ser docente y estudiante simultáneamente.
- Cada usuario selecciona un rol activo al iniciar sesión (RF02).

---

## 4. TECNOLOGÍAS Y FRAMEWORKS UTILIZADOS

### 4.1 Stack tecnológico

| Componente | Tecnología | Versión |
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
- `express`: Servidor HTTP REST
- `ts-node-dev`: Desarrollo TypeScript con hot reload
- `typescript`: Compilación y tipado estático
- `bcrypt`: Hash de contraseñas
- `jsonwebtoken`: Autenticación JWT

**Frontend:**
- `vue`: Framework reactivo
- `vite`: Build tool y dev server
- `typescript`: Tipado estático
- `pinia`: State management

**Base de datos:**
- `PostgreSQL 16`: Motor RDBMS relacional

---

## 5. DISEÑO DE INTERFAZ DE USUARIO (UI/UX)

### 5.1 Principios aplicados

- **Usabilidad:** Interfaz intuitiva con flujos claros para cada rol.
- **Accesibilidad:** Soporte para navegación por teclado y lectores de pantalla.
- **Consistencia:** Paleta de colores uniforme, tipografía estándar, componentes reutilizables.
- **Responsividad:** Adaptación a dispositivos móviles y desktop.

### 5.2 Vistas principales

- Login con selector de rol activo.
- Dashboard personalizado por rol (estudiante, docente, administrador).
- Formularios de registro, gestión de perfiles.
- Listados de cursos, inscripciones, calificaciones.
- Modales para acciones críticas (inscribir, cambiar rol).
- Vistas de reportes (PDF, Excel).

### 5.3 Estado

En progreso durante fase de desarrollo. Maquetación preliminar con herramientas de diseño.

---

## 6. ARQUITECTURA Y PATRONES DE DISEÑO

### 6.1 Arquitectura limpia

Se implementa arquitectura limpia con cuatro capas concéntricas:

```
┌─────────────────────────────────────────┐
│ Interfaces (Controladores, Rutas)       │ ← HTTP REST
├─────────────────────────────────────────┤
│ Application (Casos de Uso)              │ ← Lógica de negocio
├─────────────────────────────────────────┤
│ Domain (Entidades, Repositorios)        │ ← Reglas de negocio
├─────────────────────────────────────────┤
│ Infrastructure (BD, Servicios)          │ ← Implementaciones
└─────────────────────────────────────────┘
```

- **Domain:** Entidades (Usuario, Curso, Inscripción, etc.) e interfaces de repositorios. Define QUÉ.
- **Application:** Casos de uso (RegistrarUsuario, IniciarSesión, InscribirCurso, etc.) y DTOs. Define CÓMO.
- **Infrastructure:** Implementaciones PostgreSQL, adaptadores HTTP, servicios. Define DÓNDE Y CÓMO se guardan.
- **Interfaces:** Controladores Express, definición de rutas, middleware. Define CÓMO SE ACCEDE.

### 6.2 Cinco patrones de diseño implementados

#### 6.2.1 Patrón Inyección de Dependencias

**Ubicación:** `src/application/use-cases/`

Fundamental para garantizar que la capa Application no dependa de Infrastructure. Las dependencias (BD, servicios) se inyectan en constructores de casos de uso.

```typescript
// Ejemplo: IniciarSesionUseCase
class IniciarSesionUseCase {
  constructor(
    private usuarioRepository: IUsuarioRepository,  // inyectada
    private tokenService: ITokenService              // inyectada
  ) {}
  
  async execute(ci: string, password: string) {
    // Lógica sin conocer detalles de BD
    const usuario = await this.usuarioRepository.buscarPorCI(ci);
    // ...
  }
}
```

**Beneficios:** Desacoplamiento, pruebas unitarias sin BD, cambio de dependencias sin refactorización.

#### 6.2.2 Patrón Repositorio

**Ubicación:** `src/domain/repositories/` (interfaces) + `src/infrastructure/repositories/` (implementación)

Aísla acceso a PostgreSQL del resto de la aplicación. Domain define interfaces, Infrastructure implementa.

```typescript
// Domain (interfaz)
export interface IUsuarioRepository {
  guardar(usuario: Usuario): Promise<Usuario>;
  buscarPorCI(ci: string): Promise<Usuario | null>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarActivos(): Promise<Usuario[]>;
  actualizar(id: number, usuario: Partial<Usuario>): Promise<void>;
  eliminar(id: number): Promise<void>; // soft delete
}

// Infrastructure (implementación PostgreSQL)
export class UsuarioRepositoryPostgres implements IUsuarioRepository {
  async buscarPorCI(ci: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM usuarios WHERE ci = $1';
    const result = await this.db.query(query, [ci]);
    return result.rows[0] || null;
  }
  // ...
}
```

**Beneficios:** Independencia de BD, facilita migración futura, testeo sin DB.

#### 6.2.3 Data Transfer Object (DTO)

**Ubicación:** `src/application/dtos/`

Valida y transporta datos entre peticiones HTTP y casos de uso. Centraliza validaciones.

```typescript
export class RegistrarUsuarioDTO {
  constructor(
    public primerNombre: string,
    public apellidoPaterno: string,
    public correo: string,
    public ci: string,
    public contrasena: string
  ) {
    if (!primerNombre?.trim()) throw new Error("Primer nombre requerido");
    if (!correo?.includes("@")) throw new Error("Email inválido");
    if (ci?.length !== 10) throw new Error("CI debe tener 10 dígitos");
    if (contrasena?.length < 8) throw new Error("Contraseña mínimo 8 caracteres");
  }
}
```

**Beneficios:** Validación centralizada, separación de concerns, contrato claro entre capas.

#### 6.2.4 Patrón Adaptador

**Ubicación:** `src/interfaces/controllers/`

Desvincula sistema del framework web Express. Adapta Request/Response HTTP a objetos de negocio.

```typescript
export class UsuarioController {
  constructor(private registrarUsuario: RegistrarUsuarioUseCase) {}
  
  async registrar(req: Request, res: Response) {
    try {
      const dto = new RegistrarUsuarioDTO(
        req.body.primerNombre,
        req.body.apellidoPaterno,
        req.body.correo,
        req.body.ci,
        req.body.contrasena
      );
      
      const usuario = await this.registrarUsuario.execute(dto);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
```

**Beneficios:** Independencia de Express, facilita cambio de framework, lógica limpia.

#### 6.2.5 Patrón Unit of Work (Unidad de Trabajo)

**Ubicación:** `src/infrastructure/database/connection.ts`

Agrupa múltiples operaciones de BD en transacción atómica. **Crítico para RF05 (inscripción):** validar cupo e insertar simultáneamente sin race conditions.

```typescript
async inscribir(estudiante: Usuario, curso: Curso) {
  const unitOfWork = this.db.beginTransaction();
  
  try {
    // Leer cupo dentro de transacción
    const cupoDisponible = await unitOfWork.cursos.obtenerCupo(curso.id);
    if (cupoDisponible <= 0) throw new Error("Sin cupo disponible");
    
    // Insertar inscripción (decrementa cupo)
    await unitOfWork.inscripciones.crear({
      estudiante_id: estudiante.id,
      curso_id: curso.id
    });
    
    // Commit atomico
    await unitOfWork.commit();
  } catch (error) {
    await unitOfWork.rollback();
    throw error;
  }
}
```

**Beneficios:** Consistencia de datos, previene race conditions, auditoría transaccional.

### 6.3 Diagrama EER

Ver Anexo 1: Diagrama EER completo con todas entidades y relaciones.

### 6.4 Diagrama de casos de uso

Ver Anexo 2: Diagrama casos de uso por rol (estudiante, docente, administrador).

### 6.5 Diagrama de secuencia (login con roles múltiples)

Ver Anexo 3: Diagrama secuencia RF02 mostrando selector de rol activo.

---

## 7. IMPLEMENTACIÓN DEL SISTEMA

### 7.1 Estructura del proyecto en GitHub

La estructura completa se organiza en **tres capas**: Backend, Frontend, Documentación.

```
WebAppAcademico/
├── README.md                      ← Instrucciones clonado y setup
├── .gitignore
│
├── backend/                       ← API REST - Clean Architecture
│   ├── src/
│   │   ├── domain/
│   │   │   ├── entities/          ← Interfaces de entidades
│   │   │   │   ├── usuario.ts, rol.ts, carrera.ts, materia.ts
│   │   │   │   ├── curso.ts, inscripcion.ts, calificacion.ts
│   │   │   │   └── notificacion.ts
│   │   │   └── repositories/      ← Interfaces de repositorios
│   │   │       ├── usuario.repository.ts
│   │   │       ├── academico.repository.ts
│   │   │       └── rol.repository.ts
│   │   │
│   │   ├── application/
│   │   │   ├── use-cases/         ← Casos de uso (lógica negocio)
│   │   │   │   ├── auth/
│   │   │   │   │   ├── registrar-usuario.use-case.ts
│   │   │   │   │   ├── iniciar-sesion.use-case.ts
│   │   │   │   │   └── seleccionar-rol.use-case.ts
│   │   │   │   ├── inscripcion/
│   │   │   │   │   ├── inscribir-curso.use-case.ts
│   │   │   │   │   └── cancelar-inscripcion.use-case.ts
│   │   │   │   ├── calificacion/, reporte/, etc.
│   │   │   └── dtos/              ← Data Transfer Objects (validación)
│   │   │       ├── registrar-usuario.dto.ts
│   │   │       ├── iniciar-sesion.dto.ts, etc.
│   │   │
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   │   ├── connection.ts  ← Conexión PostgreSQL
│   │   │   │   ├── migrations/    ← Crear estructura BD
│   │   │   │   │   ├── 001_create_usuarios.sql
│   │   │   │   │   ├── 002_create_roles.sql
│   │   │   │   │   ├── 003_create_usuarios_roles.sql
│   │   │   │   │   ├── 004-010_create_*.sql
│   │   │   │   └── seeders/       ← Inyectar datos iniciales
│   │   │   │       ├── seed_roles.sql
│   │   │   │       ├── seed_usuarios.sql, etc.
│   │   │   └── repositories/      ← Implementaciones PostgreSQL
│   │   │       ├── usuario.repository.impl.ts
│   │   │       ├── academico.repository.impl.ts
│   │   │       └── rol.repository.impl.ts
│   │   │
│   │   └── interfaces/
│   │       ├── controllers/       ← Adaptadores Express
│   │       │   ├── usuario.controller.ts
│   │       │   ├── inscripcion.controller.ts, etc.
│   │       ├── routes/            ← Rutas HTTP
│   │       │   ├── auth.routes.ts
│   │       │   ├── usuarios.routes.ts, etc.
│   │       └── middleware/        ← Autenticación
│   │           ├── autenticacion.middleware.ts
│   │           ├── autorizacion.middleware.ts
│   │
│   ├── package.json, tsconfig.json, .env.example
│
├── frontend/                      ← SPA Vue 3 + Vite
│   ├── src/
│   │   ├── components/            ← Componentes reutilizables
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.vue, RegisterForm.vue
│   │   │   │   └── RoleSelector.vue
│   │   │   ├── dashboard/, inscripcion/, calificacion/
│   │   │   └── shared/
│   │   │       ├── Header.vue, Sidebar.vue, Footer.vue
│   │   │
│   │   ├── pages/                 ← Páginas por RF
│   │   │   ├── Login.vue, Dashboard.vue, Inscripcion.vue
│   │   │   ├── MisCalificaciones.vue, Reportes.vue
│   │   │
│   │   ├── services/              ← Servicios HTTP
│   │   │   ├── api.ts             ← Cliente HTTP
│   │   │   ├── auth.service.ts
│   │   │   ├── usuario.service.ts, etc.
│   │   │
│   │   ├── stores/                ← Pinia State Management
│   │   │   └── user.store.ts
│   │   │
│   │   ├── assets/, App.vue, main.ts
│   │
│   ├── package.json, tsconfig.json, vite.config.ts, .env.example
│
├── documentacion/                 ← Documentación oficial
│   └── Documento_Proyecto.md      ← Este documento
│
├── .github/
│   └── workflows/                 ← CI/CD pipelines (futuro)
│
└── .gitignore
```

### 7.2 Mapeo de patrones a estructura

| Patrón | Ubicación | Implementación |
|--------|-----------|-----------------|
| **Inyección de Dependencias** | `src/application/use-cases/` | Repositorios inyectados en constructores |
| **Patrón Repositorio** | `src/domain/repositories/` + `src/infrastructure/repositories/` | Interfaces en domain, implementación en infrastructure |
| **DTO** | `src/application/dtos/` | Validación centralizada de entrada |
| **Patrón Adaptador** | `src/interfaces/controllers/` | Adaptan Request/Response de Express |
| **Unit of Work** | `src/infrastructure/database/connection.ts` | Transacciones atómicas para RF05 |

### 7.3 Organización del código

**Backend sigue limpieza de capas:** Domain → Application → Infrastructure → Interfaces  
**Frontend sigue separación por feature:** Components → Pages → Services → Stores

---

## 8. EVALUACIÓN DE CALIDAD (ISO 25010)

### 8.1 Atributos de calidad

| Atributo | Criterio | Estado |
|---|---|---|
| Funcionalidad | RF01-RF12 implementados y testeados | En progreso |
| Confiabilidad | Manejo de errores, transacciones ACID | En progreso |
| Usabilidad | Interfaz intuitiva, accesibilidad | En progreso |
| Eficiencia | Tiempos respuesta < 2s | En progreso |
| Mantenibilidad | Código limpio, documentación, patrones | En progreso |
| Portabilidad | Multi-plataforma, contenedores | En progreso |

### 8.2 Estado

Evaluación pendiente durante fase de testing.

---

## 9. PRUEBAS DEL SISTEMA

### 9.1 Tipos de pruebas planificadas

- **Unitarias:** Casos de uso y repositorios sin BD.
- **Integración:** Casos de uso con BD real en ambiente test.
- **Funcionales:** Flujos completos por rol (RF01-RF12).
- **No funcionales:** Rendimiento, seguridad, accesibilidad.

### 9.2 Cobertura

Objetivo: mínimo 70% de cobertura de casos de uso críticos.

### 9.3 Estado

En progreso. Plan de testing en ejecución.

---

## 10. PROBLEMAS ENCONTRADOS

### 10.1 Problemas técnicos

Pendiente documentación durante desarrollo y testing.

### 10.2 Problemas de diseño

Pendiente documentación durante desarrollo.

---

## 11. PROPUESTAS DE MEJORA

### 11.1 Futuras iteraciones

- Implementar API GraphQL adicional.
- Agregar sistema de notificaciones en tiempo real con WebSockets.
- Integrar con servicios de terceros (Google Classroom, etc.).
- Mejoras de rendimiento con caché (Redis).
- Análisis de datos académicos con ML.

---

## 12. CONCLUSIONES

Se propone una solución arquitecturalmente sólida que aplica Clean Architecture y cinco patrones de diseño comprobados. La estructura del proyecto es estándar industria, facilitando mantenibilidad y escalabilidad. Roles múltiples, validaciones complejas (cupos, horarios) y seguridad (JWT, bcrypt) están contemplados desde el diseño.

El equipo está capacitado para implementar cada RF en paralelo respetando la arquitectura propuesta.

---

## 13. ANEXOS

### Anexo 1: Diagrama EER

Ver README.md en repositorio.

### Anexo 2: Diagrama de casos de uso

Ver README.md en repositorio.

### Anexo 3: Diagrama de secuencia (RF02)

Ver README.md en repositorio.

### Anexo 4: Estándar del proyecto

Ver `ESTANDAR_PROYECTO_OFICIAL_v2.md` (documento interno).

---

**Documento versión:** 1.0  
**Última actualización:** 26/05/2026  
**Estado:** NORMATIVA - Oficial del proyecto
