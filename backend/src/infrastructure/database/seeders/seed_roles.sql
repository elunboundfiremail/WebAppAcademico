-- seed_roles.sql
-- Insertar roles base del sistema

INSERT INTO roles (id, nombre, descripcion, permisos, activo) VALUES
('rol-admin', 'Admin', 'Administrador del sistema', '["todos"]', TRUE),
('rol-docente', 'Docente', 'Docente académico', '["calificar", "ver_estudiantes", "enviar_notificaciones"]', TRUE),
('rol-estudiante', 'Estudiante', 'Estudiante de la carrera', '["inscribirse", "ver_calificaciones", "descargar_reportes"]', TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
