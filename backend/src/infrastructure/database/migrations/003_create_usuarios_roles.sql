-- 003_create_usuarios_roles.sql
-- Junction table: un usuario puede tener múltiples roles

CREATE TABLE IF NOT EXISTS usuarios_roles (
  usuario_id VARCHAR(36) NOT NULL,
  rol_id VARCHAR(36) NOT NULL,
  rol_seleccionado BOOLEAN DEFAULT FALSE,
  asignado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usuario_id, rol_id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE
);
