import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
import Cursos from '../pages/Cursos.vue';
import Inscripciones from '../pages/Inscripciones.vue';
import Calificaciones from '../pages/Calificaciones.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/cursos',
      name: 'Cursos',
      component: Cursos
    },
    {
      path: '/inscripciones',
      name: 'Inscripciones',
      component: Inscripciones
    },
    {
      path: '/calificaciones',
      name: 'Calificaciones',
      component: Calificaciones
    }
  ]
});

export default router;