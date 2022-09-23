<template>
  <div>rendering conditional, Representación condicional</div>
  <!-- ////////// v-if -->
  <button @click="awesome = !awesome">Toggle</button>
  <h3 v-if="awesome">Vue is awesome!</h3>
  <h3 v-else>Oh no 😢</h3>
  <!-- ///////// v-for -->
  <ul>
    <li v-for="value in myObject" :key="value">
      {{ value }}
    </li>
  </ul>
  <!-- ///// OJO///////////////////////////////////////////////////////////
  ///// OJO///////////////////////////////////////////////////////////
  ///// OJO/////////////////////////////////////////////////////////// -->
  <li v-for="(value, key, index) in myObject" :key="value">
    {{ index }}. {{ key }}: {{ value }}
  </li>
  <!-- ///// OJO///////////////////////////////////////////////////////////
  ///// OJO///////////////////////////////////////////////////////////
  ///// OJO/////////////////////////////////////////////////////////// -->
  <li v-for="(item, index) in items" :key="index">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
  <!-- //desestructuración  -->
  <li v-for="({ message }, index) in items" :key="index">
    {{ message }} {{ index }}
  </li>

  <li v-for="n in evenNumbers" :key="n.value">{{ n }}</li>
  <ul v-for="numbers in sets" :key="numbers">
    <li v-for="n in even(numbers)" :key="n.value">{{ n }}</li>
  </ul>

  <!-- //////////////////////// manejo de eventos -->
  <button @click="greet">Greet</button>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
const awesome = ref(true);
// --v-for
const myObject = reactive({
  title: "How to do lists in Vue",
  author: "Jane Doe",
  publishedAt: "2016-04-10",
});

const parentMessage = ref("Parent");
const items = ref([{ message: "Foo" }, { message: "Bar" }]);
// resultados filtrados/ordenados
const numbers = ref([1, 2, 3, 4, 5]);
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0);
});
// con funtion y donde el computed no sircve( matrices)
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
]);
function even(numbers) {
  return numbers.filter((number) => number % 2 === 0);
}
////manejo de eventos
const name = ref("Vue.js");

function greet(event) {
  alert(`Hello ${name.value}!`);
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName);
  }
}
</script>
