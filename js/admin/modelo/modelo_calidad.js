import config from "../../supabase/keys.js";

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

    limpiarSaltosDeLinea(texto) {
        // Eliminar saltos de línea y espacios adicionales
        let textoSinEspacios = texto.replace(/\s+/g, ' ');

        // Eliminar espacios al principio y al final
        let textoLimpio = textoSinEspacios.trim();

        return textoLimpio
    },

    async actualizarDatosVenta(valores) {

        const observaciones_calidad = this.limpiarSaltosDeLinea(valores.observaciones_calidad)

        const data_clientes = {
            llamada_calidad: valores.llamada_calidad,
            calidad_enviada: valores.calidad_enviada,
            verificacion_calidad: valores.verificacion_calidad,
            observaciones_calidad: observaciones_calidad,
            audios_cargados: valores.audios_cargados,
            cedula: valores.cedula,
            legalizacion: valores.legalizacion,
            id_venta: valores.id_venta.trim(),
        };

        const res = axios({
            method: "PUT",
            url: "https://equitisoporte.pythonanywhere.com/editar-venta-calidad/",
            data: data_clientes,
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

}

export default Modelo;