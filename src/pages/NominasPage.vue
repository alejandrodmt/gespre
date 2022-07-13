<template>
  <div class="q-pa-md">
    <q-toggle v-model="f" />
    <q-table
      title="Usuarios"
      :rows="rows"
      :columnasGespre="columns"
      row-key="id"
      :fullscreen="f"
    >
      <template v-slot:top-left>
        <q-btn icon="refresh" round @click="ListarusuariosGespre" />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ListarusuariosGespre from "src/composables/useUserApi.js";
import { rows } from "src/composables/useUserApi.js";

//usuariosListar();

const columns = [
  {
    label: "Nombre",
    name: "nombre",
    field: "nombre",
    sortable: true,
  },
  {
    label: "Edad",
    name: "edad",
    field: "edad",
    sortable: true,
  },
  {
    label: "Apellidos",
    name: "apellidos",
    field: "apellidos",
    sortable: true,
  },
];

const columnasGespre = [
  {
    label: "Nombre",
    name: "nombre",
    field: "nombre",
    sortable: true,
  },
  {
    label: "Apellidos",
    name: "apellidos",
    field: "apellidos",
    sortable: true,
  },
  {
    label: "Usuario",
    name: "usuarios",
    field: "usuarios",
    sortable: true,
  },
  {
    label: "Usuario",
    name: "solapin",
    field: "solapin",
    sortable: true,
  },
  {
    label: "Rol",
    name: "rol",
    field: "rol",
    sortable: true,
  },
];

const f = ref(false);
</script>
