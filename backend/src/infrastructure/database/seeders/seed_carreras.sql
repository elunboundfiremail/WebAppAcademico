-- seed_carreras.sql

INSERT INTO carreras (id, codigo, nombre, descripcion, duracion_semestres, activo) VALUES
('carrera-1', 'ING-SOFT-001', 'Ingeniería de Software', 'Carrera en Ingeniería de Software con énfasis en desarrollo web', 8, TRUE),
('carrera-2', 'ADMIN-001', 'Administración', 'Carrera en Administración de Empresas', 8, TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
