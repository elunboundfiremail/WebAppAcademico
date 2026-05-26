-- seed_cursos.sql

INSERT INTO cursos (id, codigo, nombre, materia_id, docente_id, cupo_maximo, cupo_disponible, activo) VALUES
('curso-1', 'PROG-001-001', 'Programación I - Grupo A', 'materia-1', 'user-docente1', 30, 25, TRUE),
('curso-2', 'PROG-002-001', 'Programación II - Grupo A', 'materia-2', 'user-docente1', 30, 28, TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
