import { api } from "src/boot/axios";
import { ref } from "vue";

export const rows = ref([]);

function ListarusuariosGespre() {
  api
    .get("/gespre/usuario/")
    .then((response) => {
      rows.value = response.data;
    })
    .catch((error) => console.log(error));
}

export default ListarusuariosGespre;
// export {rows}
