<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-12 col-lg-12 col-sm-12">
        <span class="text-h6">Usuarios</span>
      </div>
    </div>
    <q-table
      dense
      title="Usuarios"
      :rows="rows"
      :columns="columnasGespre"
      row-key="id"
      :fullscreen="f"
      separator="cell"
    >
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            icon="create"
            color="primary"
            @click="editUser(props.row)"
          ></q-btn>
          <q-btn
            class="q-ml-sm"
            icon="delete"
            color="negative"
            @click="deletetUser(props.row.id)"
          ></q-btn>
        </q-td>
      </template>

      <template v-slot:top-left>
        <q-toggle v-model="f" />
      </template>
      <template v-slot:top-right>
        <q-btn
          icon="add"
          color="primary"
          dense
          outline
          class="float-right q-ma-sm"
          @click="show_dialog = true"
        ></q-btn>
      </template>
    </q-table>
    <q-dialog v-model="show_dialog">
      <q-card style="min-width: 600px">
        <q-card-section>
          <span class="text-h6">Add user</span>
        </q-card-section>
        <q-card-section>
          <q-input v-model="userData.nombre" label="Nombre"></q-input>
          <q-input v-model="userData.apellidos" label="Apellidos"></q-input>
          <q-input v-model="userData.usuarios" label="Usuario"></q-input>
          <q-input v-model="userData.solapin" label="solapin"></q-input>
          <q-input v-model="userData.pass" label="Contraseña"></q-input>
          <q-input v-model="userData.rol" label="Rol"></q-input>
        </q-card-section>
        <q-card-section>
          <q-btn class="q-ml-sm" label="Añadir" @click="AgregarUser()"></q-btn>
          <q-btn
            class="q-ml-sm"
            label="Cancelar"
            @click="(show_dialog = false), (userData = {})"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <!-- <div>{{ selected }}</div> -->
</template>

<script setup>
import { ref } from "vue";
import ListarusuariosGespre from "src/composables/useUserApi.js";
import { rows } from "src/composables/useUserApi.js";
import { api } from "src/boot/axios";
ListarusuariosGespre();

const show_dialog = ref(false);

const userData = ref({
  id: "",
  nombre: "",
  apellidos: "",
  usuarios: "",
  solapin: "",
  pass: "",
  rol: "",
});

function editUser(item) {
  console.log(item);
  this.userData.id = item.id;
  this.userData.nombre = item.nombre;
  this.userData.apellidos = item.apellidos;
  this.userData.usuarios = item.usuarios;
  this.userData.solapin = item.solapin;
  this.userData.pass = item.pass;
  this.userData.rol = item.rol;
  console.log(userData);
  this.show_dialog = true;
}
function deletetUser(idUser) {
  console.log(idUser);
  api
    .delete("/gespre/usuario/" + idUser)
    .then((response) => {
      ListarusuariosGespre();
      console.log(response);
    })
    .catch((error) => console.log(error));
}

function AgregarUser() {
  console.log(this.userData);
  api
    .post("/gespre/usuario/", this.userData)
    .then((response) => {
      ListarusuariosGespre();
      this.show_dialog = false;
      this.userData = {}; ///esto es valido o puede dat algun problema
      console.log(response);
    })
    .catch((error) => console.log(error));
}

const columnasGespre = [
  {
    label: "Id",
    name: "id",
    field: "id",
    sortable: true,
  },
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
    label: "Rol",
    name: "rol",
    field: "rol",
    sortable: true,
  },
  {
    label: "Solapin",
    name: "solapin",
    field: "solapin",
    sortable: true,
  },
  {
    name: "accion",
    label: "Acciones",
    aling: "right",
    sortable: true,
  },
];

const f = ref(false);
</script>
