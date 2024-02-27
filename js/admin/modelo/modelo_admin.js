import config from '../../supabase/keys.js';

//Modelo que recibe los datos y los envia a la base de datos
const Modelo = {

    async ventasDiaActual() {
        const res = axios({
            method: "GET",
            url: 'https://equitisoporte.pythonanywhere.com/estadisticas-venta-dia/',
            headers: config.headers,
        });
        return res
    },

    async ventaAgenteSemanaActual() {
        const res = axios({
            method: "GET",
            url: 'https://equitisoporte.pythonanywhere.com/ventas-agente-semana-actual/',
            headers: config.headers,
        });
        return res
    },

    async ventasMesActual() {
        const res = axios({
            method: "GET",
            url: 'https://equitisoporte.pythonanywhere.com/estadisticas-agentes-mensual/',
            headers: config.headers,
        });
        return res
    },


    async descargarCSV() {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/descargar-ventas/",
            headers: config.headers,
            responseType: 'arraybuffer',  // Indica a Axios que esperamos una respuesta binaria
        });

        return res
    },

    async ventasPorLiderEquipo(nombre_lider_equipo) {
        const res = axios({
            method: "GET",
            url: 'https://equitisoporte.pythonanywhere.com/info-equipo/' + nombre_lider_equipo,
            headers: config.headers,
        });
        return res
    },

    async traerVentasRealizadasAgente(cedula) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            //url: "https://equitisoporte.pythonanywhere.com/mostrar-ventas-realizadas/"+cedula,
            url: "https://equitisoporte.pythonanywhere.com/mostrar-ventas-realizadas/" + cedula,
            headers: config.headers,
        });
        return res
    },

    async traerDatosPersonalesAgente(cedula) {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            //url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/"+cedula,
            url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },

    limpiarSaltosDeLinea(texto) {
        // Eliminar saltos de línea y espacios adicionales
        let textoSinEspacios = texto.replace(/\s+/g, ' ');

        // Eliminar espacios al principio y al final
        let textoLimpio = textoSinEspacios.trim();

        return textoLimpio
    },

    async actualizarDatosVenta(valores) {

        const observaciones_adicionales = this.limpiarSaltosDeLinea(valores.observaciones_adicionales)
        const observaciones_calidad = this.limpiarSaltosDeLinea(valores.observaciones_calidad)

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
            observaciones_calidad: observaciones_calidad,
            audios_cargados: valores.audios_cargados,
            estado: valores.estado,
            observaciones_adicionales: observaciones_adicionales,
            cedula: valores.cedula,
            legalizacion: valores.legalizacion,
            id_venta: valores.id_venta.trim(),
        };

        const res = await axios({
            method: "PUT",
            url: "https://equitisoporte.pythonanywhere.com/editar-venta/",
            headers: config.headers,
            data: data_clientes

        });
        return res
    },

    async editarEstadoDesdeTabla(idVenta, estadoo) {

        const infoEstado = {
            estado: estadoo,
            id_venta: idVenta
        }

        const res = await axios({
            method: "PUT",
            url: "https://equitisoporte.pythonanywhere.com/editar-venta-estado/",
            data: infoEstado,
            headers: config.headers,
        });
        return res

    },

    async traerTodasLasVentas() {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-ventas/",
            headers: config.headers,
        });
        return res
    },

    async eliminarVenta(id) {

        const res = axios({
            method: "DELETE",
            url: "https://equitisoporte.pythonanywhere.com/eliminar-venta/" + id,
            headers: config.headers,
        });

        return res
    },

    async mostrarVentasPorFecha(fechaFormateada) {

        const datos_enviar = {
            fecha_venta: fechaFormateada
        }

        const res = await axios({
            method: "POST",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-por-fecha/",
            headers: config.headers,
            data: datos_enviar

        });
        return res
    },

    async mostrarVentasPorEstado(estado) {

        const datos_enviar = {
            estado: estado
        }

        const res = await axios({
            method: "POST",
            url: "https://equitisoporte.pythonanywhere.com/mostrar_por_estado/",
            headers: config.headers,
            data: datos_enviar

        });
        return res
    },

    async mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal) {

        const datosEnviar = {
            fecha_inicial: fechaFormateadaInicio,
            fecha_final: fechaFormateadaFinal
        }

        const res = await axios({
            method: "POST",
            url: "https://equitisoporte.pythonanywhere.com/mostrar_por_intervalo/",
            headers: config.headers,
            data: datosEnviar
        })
        return res
    }

}
export default Modelo;
