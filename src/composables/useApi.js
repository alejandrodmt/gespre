import { Notify, Dialog, QSpinnerGears } from "quasar";
// import isJwtTokenExpired, { decode } from "jwt-check-expiry";
import { api } from "boot/axios";
import isJwtTokenExpired, { decode } from "jwt-check-expiry";
import { useRouter } from "vue-router";
import { loggedUser } from "./useState";

export default function useApi(url) {
  const router = useRouter();

  const Listar = (list) => {
    api
      .get(url)
      .then((response) => {
        // DE lo que me devuelve el servidor q solamento son los 10 primeros usuario
        // yo solo utilizo el contenido
        list.value = response.data.contenido;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const GetPorId = (id, form) => {
    api
      .get(url + id)
      .then((response) => {
        form.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const guardar = (object) => {
    api({
      method: "post",
      url: url,
      data: object,
    })
      // .then((response) => {
      //   Listar(list, url); //TODO: Eliminar condicion una vez que se unifique la url
      // })
      .catch((error) => {
        console.log("🚀 ~ file: useAPI.js ~ line 38 ~ guardar ~ error", error);
      });
  };
  const actualizar = (object, id) => {
    api({
      method: "put",
      url: url + id,
      data: object,
    }).catch((error) => {
      console.log("🚀 ~ file: useAPI.js ~ line 38 ~ guardar ~ error", error);
    });
  };

  const eliminar = (object, list) => {
    console.log(object + " useApi");

    Dialog.create({
      title: "Confirmar",
      message: "Estas seguro de eliminar",
      cancel: true,
      persistent: true,
    })
      .onOk(() => {
        api({
          method: "delete",
          url: url + object,
        })
          .then(() => {
            Listar(list, url); //TODO: Eliminar condicion una vez que se unifique la url
            Notify.create({
              message: "Eliminado",
              type: "positive",
              icon: "check",
              timeout: 2500,
              textColor: "white",
              actions: [{ icon: "close", color: "white" }],
            });
          })
          .catch((error) => {
            Notify.create({
              message: "ERROR",
              type: "negative",
              icon: "error",
            });
          });
      })
      .onCancel(() => {
        // console.log('>>>> Cancel')
      });
  };

  const login = (loginObject) => {
    let noti = Notify.create({
      type: "ongoing",
      message: `Autorisando a: ${loginObject.usuarios}`,
      spinner: QSpinnerGears,
      actions: [{ label: "Ocultar", color: "white" }],
    });
    api({
      url: url + "iniciarSesion",
      method: "post",
      data: loginObject,
      headers: { "Content-Type": "application/json" }, //q sera esto
    })
      .then((response) => {
        let token = response.data.tokenDeAcceso;

        // Almacenar en localStorage, chequear y actualizar estado global
        // localStorage.setItem("token", token);
        // console.log(token);
        // router.push({ name: "prenominas" });
        autorizar(token);

        // Notificación
        noti({
          type: "positive",
          timeout: 2500,
          spinner: null,
          message: `Autorisacion exitosa`,
          actions: [{ label: "OK", color: "white" }],
        });
      })
      .catch((error) => {
        console.log("🚀 ~ file: useAPI.js ~ login ~ error", error);
        console.log("loginObject: ", loginObject);
        notifyError(error, noti, "No se pudo iniciar sesión");
      });
  };
  //Si se le pasa un token, lo guarda. Luego devuelve si hay un token guardado y no ha expirado.
  const autorizar = (token) => {
    console.log("🚀 useAPI autorizar");

    // Usuario del token

    // Si se recibe un token y este no ha expirado, se guarda en localStorage tanto el token mismo como el usuario decodificado
    if (token && !isJwtTokenExpired(token)) {
      console.log(
        "🚀 useAPI.js  autorizar !isJwtTokenExpired(token)",
        !isJwtTokenExpired(token)
      );
      console.log("🚀 useAPI.js autorizar token != null", token != null);

      localStorage.setItem("token", token);
      let payload = decode(token).payload;
      loggedUser.value = {
        usuario: payload.sub,
        rol: payload.roles[0],
      };
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser.value));

      console.log("usuarios: " + loggedUser.value.usuario);
      console.log("rol: " + loggedUser.value.rol);
      console.log(
        "localStore: " +
          localStorage +
          " ,localStore.getItem:" +
          localStorage.getItem("token") +
          " , localStore.getItem('loggedUser') :" +
          localStorage.getItem("loggedUser")
      );
    }
  };

  return {
    Listar,
    guardar,
    eliminar,
    GetPorId,
    actualizar,
    login,
  };
}
