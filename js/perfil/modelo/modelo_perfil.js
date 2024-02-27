import config from '../../supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {
    async traerDatosPersonalesAgente(cedula) {

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },
    async actualizarAgente(datos){

        const data_agentes ={
            apodo: datos.apodo,
            usuario: datos.usuario,
            nombre: datos.nombre,
            correo: datos.correo,
            celular: datos.celular,
            campana: datos.campaña,
            lider_responsable: datos.liderResponsable,
            lider_equipo: datos.liderEquipo,
        }

        const res = axios({
            method: "PUT",
            url: "https://equitisoporte.pythonanywhere.com/actualizar-informacion-agente/",
            data: data_agentes,
            headers: config.headers,
          });
          return res
        
    }
}
export default Modelo;
