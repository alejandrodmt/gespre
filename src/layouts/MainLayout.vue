<template>
  <q-layout view="hHh lpR fff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-black text-white glossy">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-tooltip>Menu</q-tooltip>
        </q-btn>

        <q-toolbar-title>
          <q-btn to="/">
            <q-avatar link="prenominas">
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            GESPRE
          </q-btn>
        </q-toolbar-title>

        <q-btn dense flat no-wrap v-if="loggedUser">
          <q-tooltip>Usuario</q-tooltip>
          <q-avatar rounded size="40px">
            <q-badge color="red" floating>.</q-badge>
            <span>{{ loggedUser.usuario.charAt(0) }}</span>
          </q-avatar>
          <q-icon
            name="arrow_drop_down"
            size="16px"
            dropdown-icon="change_history"
          />

          <q-menu auto-close>
            <q-list dense>
              <q-item class="GL__menu-link-signed-in">
                <q-item-section>
                  <strong>{{ loggedUser.usuario }}</strong>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable class="GL__menu-link">
                <q-item-section>....</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="cerrarSeccion">
                <q-item-section> Cerrar sesión </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      bordered
      class="bg-grey-3"
    >
      <q-list>
        <q-item-label header> MENU </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white glossy">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Footer </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useRouter } from "vue-router";
import { loggedUser } from "src/composables/useState";
const router = useRouter();

function cerrarSeccion() {
  //este es el que se debe usar seguro:
  //localStorage.removeItem(nombreDelLocalStore)
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  loggedUser.value = null;
  console.log("cerrando sesion");
  router.push({ name: "login" });
}

const linksList = [
  {
    title: "Preominas",
    caption: "",
    icon: "code",
    link: "prenominas",
  },
  {
    title: "Pruevas",
    caption: "",
    icon: "las la-praying-hands",
    link: "pruebas",
  },
];

const miniState = ref(true);
const leftDrawerOpen = ref(false);
var abierto = leftDrawerOpen.value;
</script>
