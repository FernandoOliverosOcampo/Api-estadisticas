import config from '../../supabase/keys.js';

const Modelo = {

    async traerVentasRealizadasAgente(cedula) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-ventas-realizadas/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async infoEquipo(liderEquipo) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/info-equipo/" + liderEquipo,
            headers: config.headers,
        });
        return res
    },

    async traerDatosPersonalesAgente(cedula) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async mostrarEstadisticas(liderEquipo) {
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/info-equipo/" + liderEquipo,
            headers: config.headers,
        });
        return res
    },

    async mostrarEstadisticasAgente(cedula) {
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/estadisticas/" + cedula,
            headers: config.headers,
        });
        return res
    }

}
export default Modelo;