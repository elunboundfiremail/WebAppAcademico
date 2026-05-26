<template>
  <div class="layout">
    <Sidebar />
    
    <main class="content">
      <div class="page-header">
        <h2>Registro de Calificaciones</h2>
      </div>
      
      <div class="card form-section">
        <div class="form-grid">
          <label>Materia a evaluar:</label>
          <select class="form-input">
            <option value="">Seleccione su curso asignado...</option>
          </select>
          <button class="btn-secondary">Cargar Lista</button>
        </div>
      </div>

      <div class="card">
        <p>Aquí irá la tabla con la lista de alumnos y casillas de texto para ingresar sus notas finales...</p>
        <button class="btn-primary" style="margin-top: 20px;">Guardar Notas</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
/* Mismos estilos base */
.layout { display: flex; min-height: 100vh; background-color: #f7fafc; }
.content { margin-left: 250px; padding: 30px; width: 100%; }
.page-header { margin-bottom: 20px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
.btn-primary { background-color: #3182ce; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.btn-secondary { background-color: #718096; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.form-section { background-color: #ebf8ff; border: 1px solid #bee3f8; }
.form-grid { display: flex; gap: 15px; align-items: center; }
.form-input { padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px; flex-grow: 1; }
</style>