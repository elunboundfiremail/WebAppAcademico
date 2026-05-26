-- seed_materias.sql

INSERT INTO materias (id, codigo, nombre, carrera_id, semestre, creditos, activo) VALUES
('materia-1', 'PROG-001', 'Programación I', 'carrera-1', 1, 4, TRUE),
('materia-2', 'PROG-002', 'Programación II', 'carrera-1', 2, 4, TRUE),
('materia-3', 'BD-001', 'Bases de Datos', 'carrera-1', 3, 3, TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
