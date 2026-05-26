<template>
  <div class="layout">
    <Sidebar />
    
    <main class="content">
      <div class="page-header">
        <h2>Gestión de Cursos</h2>
        <button class="btn-primary">+ Nuevo Curso</button>
      </div>
      
      <div class="card">
        <p>Aquí irá la tabla con la lista de los cursos...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background-color: #f7fafc;
}

.content {
  margin-left: 250px; /* Deja espacio para el sidebar fijo */
  padding: 30px;
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>