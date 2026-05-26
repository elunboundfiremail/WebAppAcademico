<template>
  <aside class="sidebar">
    <h2 class="logo">UPDS Académico</h2>
    <nav class="menu">
      <router-link to="/dashboard" class="menu-item">Panel de Control</router-link>
      <router-link to="/cursos" class="menu-item">Gestión de Cursos</router-link>
      <router-link to="/inscripciones" class="menu-item">Inscripciones</router-link>
      <router-link to="/calificaciones" class="menu-item">Calificaciones</router-link>
    </nav>
    <div class="logout">
      <button @click="cerrarSesion">Cerrar Sesión</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const cerrarSesion = () => {
  // Por ahora solo nos devuelve al login
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #002b5c; /* Azul oscuro estilo universidad */
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
}

.logo {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.2rem;
}

.menu {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.menu-item {
  color: #a0aec0;
  text-decoration: none;
  padding: 15px 20px;
  transition: all 0.3s;
}

.menu-item:hover, .router-link-active {
  background-color: #004080;
  color: white;
  border-left: 4px solid #3182ce;
}

.logout {
  padding: 20px;
}

.logout button {
  width: 100%;
  padding: 10px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout button:hover {
  background-color: #c53030;
}
</style>