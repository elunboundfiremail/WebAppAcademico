-- 007_create_curso_horarios.sql

CREATE TABLE IF NOT EXISTS curso_horarios (
  id VARCHAR(36) PRIMARY KEY,
  curso_id VARCHAR(36) NOT NULL,
  dia_semana INT NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  aula VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE,
  INDEX idx_curso (curso_id),
  INDEX idx_dia (dia_semana)
);
