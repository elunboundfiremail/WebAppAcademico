-- 005_create_materias.sql

CREATE TABLE IF NOT EXISTS materias (
  id VARCHAR(36) PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  carrera_id VARCHAR(36) NOT NULL,
  semestre INT NOT NULL,
  creditos INT NOT NULL,
  activo BOOLEAN DEFAULT TRUE,
  fecha_baja TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (carrera_id) REFERENCES carreras(id),
  INDEX idx_codigo (codigo),
  INDEX idx_carrera (carrera_id),
  INDEX idx_activo (activo)
);
