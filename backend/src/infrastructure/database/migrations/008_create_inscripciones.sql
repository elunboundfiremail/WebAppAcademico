-- 008_create_inscripciones.sql

CREATE TABLE IF NOT EXISTS inscripciones (
  id VARCHAR(36) PRIMARY KEY,
  estudiante_id VARCHAR(36) NOT NULL,
  curso_id VARCHAR(36) NOT NULL,
  estado VARCHAR(50) DEFAULT 'activa',
  fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_baja TIMESTAMP NULL,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_estudiante_curso (estudiante_id, curso_id),
  FOREIGN KEY (estudiante_id) REFERENCES usuarios(id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id),
  INDEX idx_estudiante (estudiante_id),
  INDEX idx_curso (curso_id),
  INDEX idx_estado (estado),
  INDEX idx_activo (activo)
);
