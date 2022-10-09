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
      :rows="list"
      :columns="columnasGespre"
      row-key="id"
      :fullscreen="f"
      :filter="filter"
      separator="cell"
    >
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            icon="create"
            color="primary"
            @click="editUser(props.row.id)"
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
        <q-toggle label="Ampliar" icon="las la-compress" v-model="f" />

        <q-btn
          color="primary"
          label="Agregar Usuario"
          :to="{ path: 'usuarios' }"
        />
      </template>

      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          <q-btn
            class="q-ml-sm"
            label="Añadir"
            @click="guardarUsuario()"
          ></q-btn>
          <q-btn
            class="q-ml-sm"
            label="Cancelar"
            @click="(show_dialog = false), (userData = {})"
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, defineComponent, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

///service
import usuarioService from "src/services/serviceUsuario";
const router = useRouter();
//listar
const list = ref([]);
const { Listar } = usuarioService();

//si no tengo ningun token no se activa Listar() y se redireccion a otra page
onMounted(() => {
  if (localStorage.getItem("token")) {
    console.log(localStorage.getItem("token") + " esejejje");
    Listar(list);
  } else {
    router.push({ name: "login" });
  }
});

const show_dialog = ref(false);
const f = ref(false);
const filter = ref("");

const userData = ref({
  id: "",
  nombre: "",
  apellidos: "",
  usuarios: "",
  solapin: "",
  pass: "",
  rol: "",
});

function editUser(id) {
  router.push({ name: "formPage", params: { id } });
}

function deletetUser(idUser) {
  console.log(idUser + " jajaj");
  const { eliminar } = usuarioService();
  eliminar(idUser, list);
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
</script>
