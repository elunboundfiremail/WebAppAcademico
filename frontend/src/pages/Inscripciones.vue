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
            <option value="1">Juan Perez (CI: 1234567)</option>
            <option value="2">Ana Gomez (CI: 7654321)</option>
          </select>
          <select class="form-input">
            <option value="">Seleccione un curso/materia...</option>
            <option value="1">Programación IV - 1-2026</option>
            <option value="2">Base de Datos II - 1-2026</option>
          </select>
          <button class="btn-primary">Inscribir Alumno</button>
        </div>
      </div>

      <div class="card">
        <h3>Inscripciones Recientes</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Estudiante</th>
              <th>Curso</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Juan Perez</td>
              <td>Programación IV</td>
              <td>27/05/2026</td>
              <td><span class="badge-active">Activo</span></td>
              <td><button class="btn-delete">Anular</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
.layout { display: flex; min-height: 100vh; background-color: #f7fafc; }
.content { margin-left: 250px; padding: 30px; width: 100%; }
.page-header { margin-bottom: 20px; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 20px; }

/* Botones y formularios */
.btn-primary { background-color: #3182ce; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.btn-delete { background-color: #fc8181; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; }
.form-section h3 { margin-top: 0; margin-bottom: 15px; color: #2d3748; }
.form-grid { display: flex; gap: 15px; align-items: center; }
.form-input { padding: 10px; border: 1px solid #e2e8f0; border-radius: 5px; flex-grow: 1; }

/* Tabla */
.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.data-table th, .data-table td { border-bottom: 1px solid #e2e8f0; padding: 12px; text-align: left; }
.data-table th { background-color: #edf2f7; color: #4a5568; font-weight: bold; }
.badge-active { background-color: #c6f6d5; color: #22543d; padding: 3px 8px; border-radius: 12px; font-size: 0.85em; }
</style>