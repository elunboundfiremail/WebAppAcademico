-- seed_usuarios_roles.sql
-- Asignar roles a usuarios

INSERT INTO usuarios_roles (usuario_id, rol_id, rol_seleccionado) VALUES
('user-admin', 'rol-admin', TRUE),
('user-docente1', 'rol-docente', TRUE),
('user-estudiante1', 'rol-estudiante', TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
