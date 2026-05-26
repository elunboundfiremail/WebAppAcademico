<template>
  <div class="login-container">
    <h2>Sistema Web Academico UPDS</h2>
    
    <form v-if="!mostrarSelectorRol" @submit.prevent="validarCredenciales">
      <div class="form-group">
        <label>Correo Electronico:</label>
        <input type="email" v-model="formulario.correo" required placeholder="ejemplo@upds.edu.bo" />
      </div>
      <div class="form-group">
        <label>Contrasena:</label>
        <input type="password" v-model="formulario.contrasena" required />
      </div>
      <button type="submit">Ingresar</button>
    </form>

    <div v-else class="role-selector">
      <h3>Selecciona tu rol activo</h3>
      <select v-model="rolSeleccionado">
        <option disabled value="">Seleccione un rol...</option>
        <option v-for="rol in rolesDisponibles" :key="rol" :value="rol">
          {{ rol }}
        </option>
      </select>
      <button @click="ingresarAlSistema" :disabled="!rolSeleccionado">Continuar al Dashboard</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado del formulario
const formulario = reactive({
  correo: '',
  contrasena: ''
});

// Estado para el manejo de roles multiples
const mostrarSelectorRol = ref(false);
const rolSeleccionado = ref('');
const rolesDisponibles = ref<string[]>([]);

const validarCredenciales = () => {
  // Todo: Aqui ira la llamada real al backend (Dev A)
  // Por ahora simulamos que el backend nos responde que el usuario es Docente y Estudiante
  if (formulario.correo && formulario.contrasena) {
    rolesDisponibles.value = ['Admin', 'Docente', 'Estudiante'];
    mostrarSelectorRol.value = true;
  }
};

const ingresarAlSistema = () => {
  if (rolSeleccionado.value) {
    // Todo: Aqui guardaremos el rol activo en Pinia (Store)
    router.push('/dashboard');
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
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
.form-group input, select {
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
button:disabled {
  background-color: #cccccc;
}
</style>