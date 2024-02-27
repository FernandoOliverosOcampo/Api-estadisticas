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

    async traerDatosPersonalesAgente(cedula) {

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async actualizarDatosVenta(valores) {

        const data_clientes = {
            compania: valores.compania,
            nombre: valores.nombre,
            dni: valores.dni,
            telefono: valores.telefono,
            correo: valores.correo,
            direccion: valores.direccion,
            fecha_nacimiento: valores.fechaNacimiento,
            cups_luz: valores.cupsLuz,
            cups_gas: valores.cupsGas,
            iban: valores.iban,
            numero_contrato: valores.numeroContrato,
            potencia: valores.potencia,
            peaje_gas: valores.peajeGas,
            llamada_calidad: valores.llamada_calidad,
            calidad_enviada: valores.calidad_enviada,
            verificacion_calidad: valores.verificacion_calidad,
            observaciones_calidad: valores.observaciones_calidad,
            audios_cargados: valores.audios_cargados,
            estado: valores.estado,
            observaciones_adicionales: valores.observaciones_adicionales,
            cedula: valores.cedula,
            legalizacion: valores.legalizacion,
            id_venta: valores.id_venta,
        };

        const res = axios({
            method: "PUT",
            url: "https://equitisoporte.pythonanywhere.com/editar-venta/",
            data: data_clientes,
            headers: config.headers,
        });
        return res
    },

}
export default Modelo;