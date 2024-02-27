import config from "../../supabase/keys.js";

const Modelo = {

    async insertarAgente(apodo, nombre, usuario, cedulaFinal, correo, celular, grupo, campaña, liderResponsable, liderEquipo) {

        const data_agentes = {
            apodo: apodo,
            usuario: usuario,
            nombre: nombre,
            cedula: cedulaFinal,
            correo: correo || 'no dado',
            celular: celular || 'no dado',
            estado: "activo",
            grupo: grupo,
            campana: campaña,
            lider_responsable: liderResponsable,
            lider_equipo: liderEquipo,
            rol: 'agente',
            contrasena: "Findii2024"
        }

        const res = await axios(
            {
                method: "POST",
                url: "https://equitisoporte.pythonanywhere.com/registro-agente/",
                headers: config.headers,
                data: data_agentes
            }
        )
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