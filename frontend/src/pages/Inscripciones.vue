<template>
  <div class="layout">
    <Sidebar />
    
    <main class="content">
      <div class="page-header">
        <h2>Gestión de Inscripciones</h2>
      </div>
      
      <div class="card form-section">
        <h3>Nueva Inscripción</h3>
        <div class="form-grid">
          <select class="form-input">
            <option value="">Seleccione un estudiante...</option>
          </select>
          <select class="form-input">
            <option value="">Seleccione un curso/materia...</option>
          </select>
          <button class="btn-primary">Inscribir Alumno</button>
        </div>
      </div>

      <div class="card">
        <h3>Inscripciones Recientes</h3>
        <p>Aquí irá la tabla de inscritos...</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
/* Usa exactamente los mismos estilos que pusiste en Cursos.vue */
.layout { display: flex; min-height: 100vh; background-color: #f7fafc; }
.content { margin-left: 250px; padding: 30px; width: 100%; }
.page-header { margin-bottom: 20px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }
.btn-primary { background-color: #3182ce; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.form-section h3 { margin-top: 0; margin-bottom: 15px; color: #2d3748; }
.form-grid { display: flex; gap: 15px; align-items: center; }
.form-input { padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px; flex-grow: 1; }
</style>