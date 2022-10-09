import useApi from "src/composables/useApi";

export default function usuarioService() {
  const { Listar, guardar, eliminar, GetPorId, actualizar } =
    useApi("/gespre/usuario/");

  return {
    Listar,
    guardar,
    eliminar,
    GetPorId,
    actualizar,
  };
}
