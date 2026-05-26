-- seed_usuarios.sql
-- Insertar usuarios base para testing (contraseñas: password123 hasheada)

INSERT INTO usuarios (id, primer_nombre, segundo_nombre, apellido_paterno, apellido_materno, email, contrasena_hash, activo) VALUES
('user-admin', 'Admin', 'Usuario', 'Sistema', 'Admin', 'admin@ejemplo.com', '$2b$10$...[bcrypt_hash_aqui]', TRUE),
('user-docente1', 'Juan', 'Carlos', 'Pérez', 'García', 'docente1@ejemplo.com', '$2b$10$...[bcrypt_hash_aqui]', TRUE),
('user-estudiante1', 'María', 'José', 'López', 'Rodríguez', 'estudiante1@ejemplo.com', '$2b$10$...[bcrypt_hash_aqui]', TRUE)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;
