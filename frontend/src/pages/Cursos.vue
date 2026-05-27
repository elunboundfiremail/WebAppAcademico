<template>
  <div class="layout">
    <Sidebar />
    <main class="content">
      <div class="page-header">
        <h2>Gestión de Cursos</h2>
        <button class="btn-primary">+ Nuevo Curso</button>
      </div>
      
      <div class="card">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Materia</th>
              <th>Docente</th>
              <th>Periodo</th>
              <th>Cupo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Programación IV</td>
              <td>Luigi Antequera</td>
              <td>1-2026</td>
              <td>35/40</td>
              <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Eliminar</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Base de Datos II</td>
              <td>Maria Lopez</td>
              <td>1-2026</td>
              <td>40/40</td>
              <td>
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Eliminar</button>
              </td>
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
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-primary { background-color: #3182ce; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

/* Estilos de la tabla */
.data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.data-table th, .data-table td { border-bottom: 1px solid #e2e8f0; padding: 12px; text-align: left; }
.data-table th { background-color: #edf2f7; color: #4a5568; font-weight: bold; }
.btn-edit { background-color: #ecc94b; color: #744210; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; margin-right: 5px; }
.btn-delete { background-color: #fc8181; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer; }
</style>