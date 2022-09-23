<template>
  <q-page>
    <div>
      Watchers en consola

      <span>{{ counter }}</span>
      <button @click="add()">+</button>
      <button @click="sub()">-</button>
    </div>
    <br />
    Ref & onMounted
    <ul>
      <li v-for="item in list" ref="itemRefs" :key="item.value">
        {{ item }}
      </li>
    </ul>
    <h4>Componentes</h4>

    //props pasar datos del padre aal hijo<br />
    <ComponentesPage :jaja="msg" />
    <ComponentesPage :propA="42" />
    <br />
    <ComponentesSlotPage>{{ msg }}</ComponentesSlotPage>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from "vue";
import ComponentesPage from "./ComponentesPage.vue";
import ComponentesSlotPage from "./ComponentesSlotPage.vue";
const msg = ref("from parent");

const counter = ref(0);
function add() {
  counter.value++;
}
function sub() {
  counter.value--;
}
watch(counter, (newX) => {
  console.log(`counter is ${newX}`);
});

////////////////////////////////
const list = ref([1, 2, 3]);
const itemRefs = ref([]);
onMounted(() => {
  alert(itemRefs.value.map((i) => i.textContent));
});
//////////////////componentes
</script>
