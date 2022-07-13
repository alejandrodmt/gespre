import { api } from "src/boot/axios";
import { ref  } from "vue";

export const rows = ref([]) 

function usuariosListar () {
 api.get("/apirest/all").then((response)=>{
     rows.value=response.data
 }).catch((error)=>
 console.log(error))
}


export default usuariosListar
//export {rows}