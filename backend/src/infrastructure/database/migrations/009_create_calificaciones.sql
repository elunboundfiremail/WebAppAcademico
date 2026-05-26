-- 009_create_calificaciones.sql

CREATE TABLE IF NOT EXISTS calificaciones (
  id VARCHAR(36) PRIMARY KEY,
  inscripcion_id VARCHAR(36) NOT NULL,
  nota DECIMAL(5, 2),
  estado VARCHAR(50) DEFAULT 'pendiente',
  fecha_calificacion TIMESTAMP NULL,
  observaciones TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (inscripcion_id) REFERENCES inscripciones(id),
  INDEX idx_inscripcion (inscripcion_id),
  INDEX idx_estado (estado),
  INDEX idx_nota (nota)
);
