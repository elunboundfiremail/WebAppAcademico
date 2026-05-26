-- seed_curso_horarios.sql

INSERT INTO curso_horarios (id, curso_id, dia_semana, hora_inicio, hora_fin, aula) VALUES
('horario-1', 'curso-1', 1, '08:00:00', '10:00:00', 'Aula 101'),
('horario-2', 'curso-1', 3, '08:00:00', '10:00:00', 'Aula 101'),
('horario-3', 'curso-1', 5, '08:00:00', '10:00:00', 'Aula 101')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
