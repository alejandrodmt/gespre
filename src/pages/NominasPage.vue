<template>
  <div class="q-pa-md">
    <q-toggle v-model="f" />
    <q-table
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :fullscreen="f"
    >
    <template v-slot:top-left>
    <q-btn icon="refresh" round @click="usuariosListar" />
</template>


    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import usuariosListar from "src/composables/useUserApi.js";
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



const f = ref(false);
</script>
