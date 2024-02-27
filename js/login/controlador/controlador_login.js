import Modelo from "../modelo/modelo_login.js";
import Vista from "../vista/login.js";
const Controlador = {

    async iniciarSesion() {
        const { correo, password } = Vista.getDatosInicioSesion();
        try {
            const res = await Modelo.iniciar_seion(correo, password);

            if (res.data.acceso == "AUTORIZADO") {
                const access_token = res.data.access_token;
                const cedula = res.data.cedula;
                const rol = res.data.rol;


                localStorage.setItem("access_token", access_token);
                localStorage.setItem("cedula", cedula);
                localStorage.setItem("rol", rol);

                if(res.data.rol == "admin"){
                    Vista.redirigirAdmin();
                }

                if (res.data.rol == "agente"){
                    Vista.redirigirAIndex();
                }

                if (res.data.rol == "team leader"){
                    Vista.redirigirTeamLeader();
                }

                if (res.data.rol == "calidad"){
                    Vista.redirigirCalidad();
                }
                
                if (res.data.rol == "reportes"){
                    Vista.redirigirReportes();
                }


            } else {
                Vista.mostrarMensajeError("Usuario no encontrado")
                //Vista.limpiarCampos();
            }

        } catch (err) {
            Vista.mostrarMensajeError('Error al iniciar sesión');
            console.log(err);
        }
    },

}
export default Controlador