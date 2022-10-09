const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "pruebas", component: () => import("pages/PruebasPage.vue") },
      {
        path: "login",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "prenominas",
        name: "prenominas",
        component: () => import("pages/NominasPage.vue"),
      },
      {
        path: "usuarios/:id?", // el signo de interrogacion(?) significa q es un campo no obligatorio para ese parametroo
        name: "formPage",
        component: () => import("pages/formPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
