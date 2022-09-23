<template>
  <!-- ----------------------prueva q entendi -->
  <!-- solo se activa una sola vez -->
  <button @click.once="say('hello')">Say hello</button>
  <div>
    primero un click sobre ellos
    <!-- cuando preciono enter -->
    <button @keyup.enter="say('Preciona enter')">Preciona enter</button>
    <button @keyup.alt.enter="say('Preciona Alt+enter')">
      Preciona Alt+enter
    </button>
  </div>
  <div>
    <button @click="say('hello')">Say hello</button>
    <button @click="say('bye')">Say bye</button>
    <!-- using $event special variable -->
    <button @click="warn('Form cannot be submitted yet.', $event)">
      Submit
    </button>

    <!-- using inline arrow function -->
    <button @click="(event) => warn('Form cannot be submitted yet.', event)">
      Submit
    </button>
  </div>
  <!-- ///////////////v-mdel -->
  <h3>V-model</h3>
  <!-- /////////////////////////////////quasarrrrrrrrrrr -->
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input clearable v-model="message" :dense="dense">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>

      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        hint="Password with toggle"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
  </div>

  <p>Message is: {{ message }}</p>
  <input v-model="message" placeholder="edit me" />
  <!-- /// -->
  <div>Checked names: {{ asdf }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="asdf" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="asdf" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="asdf" />
  <label for="mike">Mike</label>

  <div>pick: {{ pick }}</div>

  <input type="radio" id="one" value="One" v-model="pick" />
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="pick" />
  <label for="two">Two</label>
  <input type="radio" id="three" value="Three" v-model="pick" />
  <label for="three">three</label>

  <div>selected: {{ sele }}</div>
  <select v-model="sele">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <!-- /////// v -for -->
  <br />
  <select v-model="selected">
    <option v-for="option in options" :value="option.value" :key="option.value">
      {{ option.text }}
    </option>
  </select>
  <div>Selected: {{ selected }}</div>

  a
  <select v-model="selected">
    <!-- inline object literal -->
    <option :value="{ number: 123 }">123</option>
  </select>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

function say(message) {
  alert(message);
}
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault();
  }
  alert(message);
}
//////v-modell
const message = ref("");
const asdf = ref([]);
const pick = ref([]);

const sele = ref([]);
////v-for
const selected = ref("A");

const options = ref([
  { text: "One", value: "A" },
  { text: "Two", value: "B" },
  { text: "Three", value: "C" },
]);

const dense = ref(false);
const password = ref("");
const isPwd = ref(true);
</script>
