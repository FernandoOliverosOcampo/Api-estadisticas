import config from '../../supabase/keys.js';

const Modelo = {

    async ventasPorLiderEquipo(nombre_lider_equipo) {
        const res = axios({
            method: "GET",
            url: 'https://equitisoporte.pythonanywhere.com/info-equipo/' + nombre_lider_equipo,
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

    async agentesPertenecientes(liderEquipo) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/agentes-pertenecientes/" + liderEquipo,
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

}
export default Modelo