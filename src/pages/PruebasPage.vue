<template>
  <!-- NOTIFY @ == v-on -->
  <div>
    <q-btn
      push
      @click="$q.notify('My message')"
      color="primary"
      label="Show a notification"
      class="inset-shadow glossy"
    />

    <q-btn
      @click="showNotification"
      color="deep-purple-2"
      class="inset-shadow-down"
      label="Show another notification"
    />
  </div>

  <div class="row">
    <div style="order: 2">Second column</div>
    <div class="order-last">Third column</div>
    <div class="order-first">First column</div>
  </div>

  <q-circular-progress
    indeterminate
    size="30px"
    :thickness="0.3"
    color="lime"
    track-color="grey-3"
    class="q-ma-md"
  />

  <!-- ///////////////COntador button//////// @ == v-on ////////// -->
  <q-btn class="glossy" push @click="increment">Count is: {{ count }}</q-btn>
  <!-- ///////////////segun la plataforma q este utilizando////////////////// -->
  <div v-if="$q.platform.is.desktop">I'm only rendered on desktop!</div>
  <div v-if="$q.platform.is.mobile">I'm only rendered on mobile!</div>
  <div v-if="$q.platform.is.electron">I'm only rendered on Electron!</div>

  <!-- ////////////////>propiedades calculadas////////////////// -->
  <p>
    propiedades calculadas: Ha publicado libros {{ author.name }}:
    <span>{{ publishedBooksMessage }}</span>
    , Cuantos:{{ author.books.length }}
  </p>
  <p>funcion: ha publicado: {{ calculateBooksMessage2() }}</p>
  <!-- --------Enlaces de 3clase y estilo ------ -->
  <h5 class="non-selectable cursor-none">Enlaces de clase y estilo</h5>
  <div
    class="static text-center text-h4"
    :class="{ active: isActive, 'text-negative': hasError }"
  >
    hi!
  </div>
  <div class="q-pt-xs cursor-none" :class="classObject">hi 2da via</div>
  <div class="q-pl-md shadow-up-12" :class="classObject">hi computada</div>
  <div :class="[activeClass, errorClass]">hi con array</div>
  <div :class="[isActive ? activeClass : errorClass]">
    hi de forma condicional, expresión ternaria
  </div>
  <div :class="[{ active: isActive }, errorClass]">
    hi con sintaxis de objeto dentro de la sintaxis de matriz
  </div>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    hi con style
  </div>
  <div :style="{ 'font-size': fontSize + 'px' }">
    hi con style en forma de css
  </div>
  <div :style="styleObject">hi con objeto</div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, computed } from "vue";
import { reactive } from "vue";
const $q = useQuasar();
////////////Enlaces de clase y estilo
const isActive = ref(true);
const hasError = ref(false);
//otra via
const classObject = reactive({
  active: true,
  "text-primary": true,
});
//propiedad calculada que devuelve un objeto. Este es un patrón común y poderoso:
const isActive2 = ref(true);
const error = ref(null);

const classObject2 = computed(() => ({
  active: isActive2.value && !error.value,
  "text-primary": error.value && error.value.type === "fatal",
}));
// podemos unir :classa una matriz para aplicar una lista de clases:
const activeClass = ref("active");
const errorClass = ref("text-warning");
//:styleadmite la vinculación a valores de objetos de JavaScript: corresponde a un elemento HTML stylepropiedad :
const activeColor = ref("red");
const fontSize = ref(30);
//A menudo es una buena idea vincular directamente a un objeto de estilo para que la plantilla sea más limpia:
const styleObject = reactive({
  color: "green",
  fontSize: "16px",
});

////////// -- propiedades calculadas( las propiedades computadas es lo mismo que las funciones, la diferencias
// es que las calculadas guardan los valores en cache, y mientras esta no resiva cambio dara el valor sin realizar
// la operacion )'''''''''''''''''''''
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? "Yes" : "No";
});
//function
function calculateBooksMessage2() {
  return author.books.length > 0 ? "Yes" : "No";
}

// notyfy
function showNotification() {
  $q.notify("Some other message");
}
// contador
const count = ref(0);
function increment() {
  count.value++;
  console.log(`The initial count is ${count.value}.`);
}
</script>

<style></style>
