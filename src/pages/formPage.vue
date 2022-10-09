<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input
        outline
        v-model="form.nombre"
        label="Nombre*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        outline
        v-model="form.apellidos"
        label="Apellidos*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        outline
        v-model="form.usuarios"
        label="Usuario*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        outline
        v-model="form.solapin"
        label="Solapin*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        outline
        v-model="form.rol"
        label="rol*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />
      <q-input
        outline
        v-model="form.pass"
        label="Contraseña*"
        lazy-rules
        class="col-lg-6 col-xs-6"
        :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
      />

      <div class="col-12 q-gutter-sm">
        <q-btn label="Salvar" color="primary" icon="save" type="submit" />
        <q-btn
          label="Cancelar"
          color="white"
          text-color="primary"
          :to="{ name: 'prenominas' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import usuarioService from "src/services/serviceUsuario";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "formPage",
  setup() {
    const { guardar, GetPorId, actualizar } = usuarioService();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();

    const form = ref({
      id: "",
      nombre: "",
      apellidos: "",
      usuarios: "",
      solapin: "",
      pass: "",
      rol: "",
    });

    onMounted(async () => {
      if (route.params.id) {
        console.log(route.params.id);
        await GetPorId(route.params.id, form);
      }
    });

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await actualizar(form.value, form.value.id);
        } else {
          await guardar(form.value);
        }
        $q.notify({
          message: "GUARDADO",
          type: "positive",
          icon: "save",
          timeout: 2500,
          textColor: "white",
          actions: [{ icon: "close", color: "white" }],
        });
        router.push({ name: "prenominas" });
      } catch (error) {
        console.error(error);
      }
    };

    return { form, onSubmit };
  },
});
</script>
