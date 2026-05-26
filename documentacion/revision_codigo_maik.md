# Revisión de Código - Maik (Gonzamaic)

**Fecha:** 25/05/2026  
**Commits:** 75663d4, 0033d26  
**Estado:** ❌ NO HACER MERGE - Requiere correcciones

---

## ✅ QUÉ HIZO BIEN

### 1. Frontend Scaffold (Vue 3 + Vite + TypeScript)
- Estructura correcta: `src/`, `public/`, `index.html`, `package.json`
- Dependencias apropiadas:
  - Vue 3.5.34
  - Vite 8.0.12
  - TypeScript 6.0.2
  - Vue TSConfig 0.9.1
- Scripts listos: `dev`, `build`, `preview`
- Entry point limpio en `main.ts`
- **Veredicto:** ✅ Listo para usar

### 2. Concepto de Domain Entities (pero estructura INCORRECTA)
- El patrón de separación es correcto: `/domain/entities/` para entidades, `/domain/` para repositorios
- Sigue patrón **Clean Architecture**
- **PERO:** Está bajo la ruta incorrecta (`backend/01-codigo/backend/...`)

### 3. Documento Reportes
- Inicia bien con los 3 tipos de reportes para RF12
- Campos desglosados por tipo (administrador, docente, estudiante)
- Menciona formatos requeridos (PDF, Excel)

---

## 🔴 PROBLEMAS CRÍTICOS

### PROBLEMA 1: Estructura de Carpetas INCORRECTA
```
❌ ACTUAL:    backend/01-codigo/backend/src/domain/...
✅ DEBERÍA:   src/domain/... (directamente en raíz)
```
**Raíz:** NO debe haber carpetas `01-codigo`, `02-interno`, `03-presentacion` en el repo. 
Las capas (domain, application, infrastructure, interfaces) deben estar DIRECTAMENTE bajo `src/` en la raíz.

### PROBLEMA 2: Entidad Usuario - NO sigue diseño acordado
```typescript
// ❌ LO QUE SUBIÓ MAIK:
export interface Usuario {
  id: number;
  nombre: string;              // ❌ Incorrecto
  correo: string;
  contrasena: string;
  rol: string;                 // ❌ Incorrecto
  esta_activo: boolean;
}

// ✅ LO QUE SE ACORDÓ EN DISEÑO BD:
export interface Usuario {
  id: number;
  primer_nombre: string;
  segundo_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  ci: string;                  // Cédula de identidad
  correo: string;
  contrasena_hash: string;     // ⚠️ NUNCA plain text
  activo: boolean;
  fecha_creacion: Date;
  fecha_baja?: Date;
  // ⚠️ roles van en tabla SEPARADA: usuarios_roles (roles múltiples)
}
```

**Impacto:** Los datos no coincidirán con la base de datos diseñada.

### PROBLEMA 3: Ignora ROLES MÚLTIPLES (diseño acordado)
- Usuario tiene `rol: string` (rol único)
- **NO contempla** la tabla `usuarios_roles` acordada
- Un usuario NO puede ser docente Y estudiante simultáneamente
- **Falta crear:**
  - Entidad `Rol`
  - Entidad `UsuarioRol` (junction table)
  - Interfaz `UsuarioRolRepository`

**Impacto crítico:** RF02 (Iniciar sesión con selector de rol) no funcionaría.

### PROBLEMA 4: Carrera incompleta
```typescript
// ❌ LO QUE SUBIÓ:
export interface Carrera {
  id: number;
  nombre: string;
  codigo: string;
}

// ✅ DEBERÍA TENER:
export interface Carrera {
  id: number;
  codigo: string;           // Ej: "ISC-001"
  nombre: string;
  descripcion: string;      // Opcional
  activo: boolean;          // ⚠️ IMPORTANTE: borrado lógico
  fecha_creacion: Date;
  fecha_baja?: Date;        // Para auditoría
}
```

**Impacto:** Sin `activo` y `fecha_baja`, no se puede hacer borrado lógico.

### PROBLEMA 5: Curso incompleto - CRÍTICO para RF05 (Inscripción)
```typescript
// ❌ LO QUE SUBIÓ:
export interface Curso {
  id: number;
  materia_id: number;
  docente_id: number;
  codigo_grupo: string;
  aula: string;
  dias_horario: string;      // ⚠️ String simple, no valida solapamientos
  hora_inicio: string;
  hora_fin: string;
  periodo: string;
}

// ✅ DEBERÍA TENER (para validar cupos, solapamientos, etc.):
export interface Curso {
  id: number;
  materia_id: number;
  docente_id: number;
  codigo_grupo: string;
  cupo_maximo: number;       // ⚠️ FALTA - RF05: verificar cupos
  cupo_disponible: number;   // ⚠️ FALTA - para inscripciones
  aula: string;
  periodo: string;           // Ej: "2026-1"
  activo: boolean;
  fecha_creacion: Date;
  fecha_baja?: Date;
  // Para días/horarios, mejor estructura separada (curso_horarios):
  // - dia_semana: 'lun' | 'mar' | 'mié' | 'jue' | 'vie'
  // - hora_inicio: string (HH:MM)
  // - hora_fin: string (HH:MM)
}
```

**Impacto crítico:** 
- RF05 no puede validar cupos disponibles
- No hay forma de verificar solapamientos de horarios
- Campo `dias_horario` como string simple es frágil

### PROBLEMA 6: Inscripción incompleta
```typescript
// Debería tener:
export interface Inscripcion {
  id: number;
  estudiante_id: number;
  curso_id: number;
  fecha_inscripcion: Date;
  estado: 'activa' | 'completada' | 'cancelada';
  activo: boolean;
  fecha_baja?: Date;
}
```

### PROBLEMA 7: Calificación incompleta
```typescript
// Debería tener:
export interface Calificacion {
  id: number;
  inscripcion_id: number;
  tipo_evaluacion: 'parcial' | 'examen_final' | 'tarea' | 'participacion';
  valor: number;            // 0-100
  fecha_registro: Date;
  docente_id: number;
  activo: boolean;
  fecha_baja?: Date;
}
```

### PROBLEMA 8: UsuarioRepository - Métodos insuficientes
```typescript
// ❌ LO QUE SUBIÓ:
export interface UsuarioRepository {
  guardar(usuario: Usuario): Promise<void>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorId(id: number): Promise<Usuario | null>;
}

// ✅ DEBERÍA TENER:
export interface UsuarioRepository {
  guardar(usuario: Usuario): Promise<Usuario>;
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  buscarPorCI(ci: string): Promise<Usuario | null>;  // ⚠️ FALTA
  actualizar(id: number, usuario: Partial<Usuario>): Promise<void>;  // ⚠️ FALTA
  eliminar(id: number): Promise<void>;  // Soft delete (marcar inactivo)
  buscarPorRol(rolId: number): Promise<Usuario[]>;  // ⚠️ FALTA - para listar docentes
  buscarActivos(): Promise<Usuario[]>;
}
```

**Impacto:** 
- No hay forma de buscar por CI (requisito común)
- No hay forma de actualizar datos del usuario
- No hay forma de listar docentes/estudiantes

### PROBLEMA 9: AcademicoRepository - FALTA lógica de cupos (RF05)
```typescript
// ❌ LO QUE SUBIÓ:
export interface AcademicoRepository {
  guardarCurso(curso: Curso): Promise<void>;
  buscarCursoPorId(id: number): Promise<Curso | null>;
  guardarInscripcion(inscripcion: Inscripcion): Promise<void>;
  verificarInscripcionDuplicada(estudianteId: number, cursoId: number): Promise<boolean>;
  guardarCalificacion(calificacion: Calificacion): Promise<void>;
  obtenerNotasPorInscripcion(inscripcionId: number): Promise<Calificacion[]>;
}

// ✅ DEBERÍA TENER PARA RF05:
export interface AcademicoRepository {
  // ... existentes ...
  verificarCupoDisponible(cursoId: number): Promise<boolean>;  // ⚠️ CRÍTICO - FALTA
  obtenerCuposDisponibles(cursoId: number): Promise<number>;   // ⚠️ CRÍTICO - FALTA
  actualizarCupo(cursoId: number, decrementar: boolean): Promise<void>;  // ⚠️ CRÍTICO - FALTA
  obtenerCursosDisponibles(estudianteId: number): Promise<Curso[]>;  // ⚠️ FALTA
  verificarSolapamientoHorario(docenteId: number, nuevoHorario: any): Promise<boolean>;  // ⚠️ FALTA
}
```

**Impacto crítico:** Sin estos métodos, RF05 (inscripción) no puede funcionar correctamente.

### PROBLEMA 10: Contraseña en PLAIN TEXT 🔴
```typescript
contrasena: string;  // ❌ NUNCA se debería almacenar así
```

**DEBE SER:**
```typescript
contrasena_hash: string;  // Hash bcrypt o similar
// Y usar bcrypt en Application layer para comparar
```

**Impacto crítico:** 
- Vulnerabilidad de seguridad grave
- Si la BD se filtra, todas las contraseñas están expuestas
- No cumple con buenas prácticas

---

## 📋 RESUMEN DE PROBLEMAS

| # | Problema | Severidad | Requerimiento Afectado |
|---|----------|-----------|------------------------|
| 1 | Estructura: carpetas 01-codigo/02-interno/03-presentacion | 🔴 Crítica | Estructura del proyecto |
| 2 | Usuario: nombres simples | 🔴 Crítica | BD + RF02 (Iniciar sesión) |
| 3 | Ignora roles múltiples | 🔴 Crítica | RF02, design pattern |
| 4 | Carrera: sin activo/fecha_baja | 🟡 Alta | Borrado lógico |
| 5 | Curso: sin cupos (RF05) | 🔴 Crítica | RF05 (Inscripción) |
| 6 | Curso: dias_horario string simple | 🔴 Crítica | RF05 + validación solapamientos |
| 7 | AcademicoRepository: falta lógica cupos | 🔴 Crítica | RF05 (Inscripción) |
| 8 | UsuarioRepository: métodos incompletos | 🟡 Alta | RF01, RF02, RF03 |
| 9 | Contraseña en plain text | 🔴 Crítica | Seguridad del sistema |
| 10 | Inscripción/Calificación: incompletas | 🟡 Media | RF04, RF06 |

---

## ✋ ACCIONES REQUERIDAS

### ANTES DE HACER MERGE:

1. **Corregir estructura de carpetas** 
   - Eliminar carpetas `01-codigo`, `02-interno`, `03-presentacion`
   - Ruta correcta: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/interfaces/`
   - El repo debe tener: `src/`, `package.json`, `tsconfig.json`, `README.md` solamente

2. **Actualizar entidad Usuario**
   - Usar: primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, ci
   - Cambiar contrasena → contrasena_hash
   - Agregar activo, fecha_creacion, fecha_baja

3. **Implementar roles múltiples**
   - Crear entidades: Rol, UsuarioRol
   - Eliminar campo rol de Usuario
   - Crear interfaz UsuarioRolRepository

4. **Completar Curso**
   - Agregar: cupo_maximo, cupo_disponible, activo, fecha_baja, periodo
   - Cambiar dias_horario a estructura de `curso_horarios` separada

5. **Extender UsuarioRepository**
   - Agregar: buscarPorCI, actualizar, eliminar, buscarPorRol, buscarActivos

6. **Extender AcademicoRepository**
   - Agregar métodos críticos para RF05: verificarCupoDisponible, obtenerCuposDisponibles, actualizarCupo
   - Agregar métodos de validación: verificarSolapamientoHorario, obtenerCursosDisponibles

7. **Implementar seguridad**
   - Usar bcrypt para hash de contraseñas
   - No almacenar plain text

---

## 📞 COMUNICACIÓN CON MAIK

**Mensaje para Maik:**

Hola Maik, revisuamos tu código subido. El frontend scaffold está bien, pero necesitas hacer estos ajustes en domain/entities antes de mergear:

🔴 **CRÍTICOS (bloquean merge):**
1. Estructura de carpetas: `backend/01-codigo/backend/src/` → debe ser solo `src/` en raíz (sin 01-codigo, 02-interno, 03-presentacion)
2. Usuario: usar nombres formales (primer_nombre, segundo_nombre, apellido_paterno, apellido_materno)
3. Agregar roles múltiples (entidades Rol y UsuarioRol)
4. Curso: agregar cupo_maximo, cupo_disponible
5. Métodos en repositorios: falta lógica para validar cupos (RF05)
6. Contraseña: cambiar a `contrasena_hash`, nunca plain text

Revisa el archivo `02-interno/revision_codigo_maik.md` para detalles.

---

**Estado:** 🔴 NO HACER MERGE HASTA CORREGIR TODOS LOS PUNTOS CRÍTICOS
