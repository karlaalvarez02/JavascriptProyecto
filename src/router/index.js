import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import TablaEstudiantes from "../components/TablaEstudiantes.vue";
import TablaCursos from "../components/TablaCursos.vue";
import Inscribir from "../components/Inscribir.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path:"/estudiantes",
    name:"Estudiante-Tabla",
    component:TablaEstudiantes
  },
  {
    path:"/cursos",
    name:"Cursos-Tabla",
    component:TablaCursos
  },
  {
    path:"/inscribir",
    name:"Inscripcion",
    component:Inscribir
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
