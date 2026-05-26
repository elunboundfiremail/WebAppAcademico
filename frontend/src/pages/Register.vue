<template>
  <div class="login-container">
    <h2>Registro de usuario</h2>

    <form @submit.prevent="registrar">
      <div class="form-group">
        <label>Nombres:</label>
        <input v-model="formulario.nombres" type="text" required />
      </div>
      <div class="form-group">
        <label>Apellidos:</label>
        <input v-model="formulario.apellidos" type="text" required />
      </div>
      <div class="form-group">
        <label>Correo Electronico:</label>
        <input v-model="formulario.correo" type="email" required />
      </div>
      <div class="form-group">
        <label>Contrasena:</label>
        <input v-model="formulario.contrasena" type="password" required />
      </div>
      <div class="form-group">
        <label>Confirmar Contrasena:</label>
        <input v-model="formulario.confirmar" type="password" required />
      </div>
      <button type="submit">Crear cuenta</button>
    </form>

    <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    <p v-if="error" class="error">{{ error }}</p>

    <router-link class="link" to="/login">Volver a iniciar sesion</router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const formulario = reactive({
  nombres: '',
  apellidos: '',
  correo: '',
  contrasena: '',
  confirmar: ''
});

const mensaje = ref('');
const error = ref('');

const registrar = async () => {
  mensaje.value = '';
  error.value = '';

  if (formulario.contrasena !== formulario.confirmar) {
    error.value = 'Las contrasenas no coinciden.';
    return;
  }

  try {
    const respuesta = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombres: formulario.nombres.trim(),
        apellidos: formulario.apellidos.trim(),
        correo: formulario.correo.trim(),
        contrasena: formulario.contrasena
      })
    });

    const data = await respuesta.json();
    if (!respuesta.ok) {
      error.value = data?.mensaje ?? 'No se pudo registrar.';
      return;
    }

    mensaje.value = data?.mensaje ?? 'Registro exitoso.';
  } catch (err) {
    error.value = 'No se pudo conectar con el servidor.';
  }
};
</script>

<style scoped>
.login-container {
  max-width: 420px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #0056b3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
.mensaje {
  margin-top: 12px;
  color: #1b7f2a;
}
.error {
  margin-top: 12px;
  color: #b00020;
}
.link {
  display: inline-block;
  margin-top: 12px;
  color: #0056b3;
}
</style>
