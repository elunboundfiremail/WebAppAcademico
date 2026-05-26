<template>
  <div class="layout">
    <Sidebar />
    
    <main class="content">
      <div class="page-header">
        <h2>Panel de Control</h2>
      </div>
      
      <div class="card">
        <h3>Bienvenido al Sistema Web Académico UPDS</h3>
        <p>Selecciona una opción en el menú lateral para comenzar a gestionar el sistema.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
/* Los mismos estilos estructurales para mantener la consistencia */
.layout { display: flex; min-height: 100vh; background-color: #f7fafc; }
.content { margin-left: 250px; padding: 30px; width: 100%; }
.page-header { margin-bottom: 20px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
h3 { color: #2b6cb0; margin-top: 0; }
</style>