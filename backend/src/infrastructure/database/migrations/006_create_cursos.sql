-- 006_create_cursos.sql

CREATE TABLE IF NOT EXISTS cursos (
  id VARCHAR(36) PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  materia_id VARCHAR(36) NOT NULL,
  docente_id VARCHAR(36) NOT NULL,
  cupo_maximo INT NOT NULL,
  cupo_disponible INT NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  fecha_baja TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (materia_id) REFERENCES materias(id),
  FOREIGN KEY (docente_id) REFERENCES usuarios(id),
  INDEX idx_codigo (codigo),
  INDEX idx_materia (materia_id),
  INDEX idx_docente (docente_id),
  INDEX idx_activo (activo)
);
