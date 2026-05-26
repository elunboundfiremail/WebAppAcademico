import { Router } from "express";
import { createHash, randomUUID } from "crypto";

interface Usuario {
  id: string;
  correo: string;
  contrasenaHash: string;
  nombres: string;
  apellidos: string;
  roles: string[];
  creadoEn: Date;
}

const usuarios: Usuario[] = [];

const hashContrasena = (contrasena: string) =>
  createHash("sha256").update(contrasena).digest("hex");

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const { correo, contrasena, nombres, apellidos, roles } = req.body ?? {};

  if (!correo || !contrasena || !nombres || !apellidos) {
    return res.status(400).json({
      mensaje: "Correo, contrasena, nombres y apellidos son obligatorios."
    });
  }

  const existente = usuarios.find((usuario) => usuario.correo === correo);
  if (existente) {
    return res.status(409).json({ mensaje: "El correo ya esta registrado." });
  }

  const nuevoUsuario: Usuario = {
    id: randomUUID(),
    correo,
    contrasenaHash: hashContrasena(contrasena),
    nombres,
    apellidos,
    roles: Array.isArray(roles) && roles.length > 0 ? roles : ["Estudiante"],
    creadoEn: new Date()
  };

  usuarios.push(nuevoUsuario);

  return res.status(201).json({
    mensaje: "Registro exitoso.",
    usuario: {
      id: nuevoUsuario.id,
      correo: nuevoUsuario.correo,
      nombres: nuevoUsuario.nombres,
      apellidos: nuevoUsuario.apellidos,
      roles: nuevoUsuario.roles
    }
  });
});

authRouter.post("/login", (req, res) => {
  const { correo, contrasena } = req.body ?? {};

  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ mensaje: "Correo y contrasena son obligatorios." });
  }

  const usuario = usuarios.find((item) => item.correo === correo);
  if (!usuario || usuario.contrasenaHash !== hashContrasena(contrasena)) {
    return res.status(401).json({ mensaje: "Credenciales invalidas." });
  }

  return res.json({
    mensaje: "Login exitoso.",
    usuario: {
      id: usuario.id,
      correo: usuario.correo,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      roles: usuario.roles
    }
  });
});

export { authRouter };
