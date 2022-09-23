const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "pruebas", component: () => import("pages/PruebasPage.vue") },
      { path: "rendering", component: () => import("pages/RenderingPage.vue") },
      { path: "hooks", component: () => import("pages/LifecycleHooks.vue") },
      {
        path: "manejo",
        component: () => import("pages/ManejoEventosPage.vue"),
      },
      { path: "prenominas", component: () => import("pages/NominasPage.vue") },
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
