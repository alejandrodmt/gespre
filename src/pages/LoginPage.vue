<template>
  <div class="row" style="height: 90vh">
    <div class="col-0 col-md-6 justify-center content-left">
      <img src="~assets/proteccion.png" class="responsive" alt="login-image" />
    </div>

    <div
      v-bind:class="{
        'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs,
      }"
      class="col-12 col-md-6 flex content-center"
    >
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
      >
        <q-card-section>
          <q-avatar size="103px" class="absolute-center shadow-10">
            <img src="~assets/cerradura-con-llave2.png" alt="avatar" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <div class="q-pt-lg">
            <div class="col text-h6 ellipsis flex justify-center">
              <h2 class="text-h2 text-uppercase q-my-none text-weight-regular">
                Login
              </h2>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" ref="formulario" class="q-gutter-md">
            <q-input
              label="Usuario"
              v-model="loginObject.usuarios"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Este campo no puede estar vacío',
              ]"
            >
            </q-input>
            <q-input
              label="Contraseña"
              v-model="loginObject.pass"
              :type="showPassword ? 'text' : 'password'"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') ||
                  'Este campo no puede estar vacío',
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'r_visibility' : 'r_visibility_off'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
            <div>
              <q-btn
                class="full-width"
                label="Aceptar"
                push
                no-caps
                type="submit"
                color="primary"
                rounded
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import authService from "src/services/serviceAuth";

const formulario = ref();
const loginObject = ref({ usuarios: "", pass: "" });
const showPassword = ref(false);
const $q = useQuasar();

const { login } = authService();

const onSubmit = () => {
  console.log(
    loginObject.value.usuarios + " onSumit " + loginObject.value.pass
  );
  login(loginObject.value);
  onReset();
};

const onReset = () => {
  formulario.value.resetValidation();
  loginObject.value = { usuarios: "", pass: "" };
};
</script>
