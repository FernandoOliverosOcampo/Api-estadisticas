import Vista from "../vista/calidad.js";
import Modelo from "../modelo/modelo_calidad.js";
import ModeloGeneral from "../../general/modelo/modelo_general.js"
import General from "../../general/general.js"
import swalAlert from "../../otros/alertas.js"

const Controlador = {

    async estadisticasSemanaMesDiaActual() {
        const response_dia_actual = await Modelo.ventasDiaActual();
        const response_semana_actual = await Modelo.ventaAgenteSemanaActual();
        const response_mes_actual = await Modelo.ventasMesActual();

        if (response_dia_actual.data['venta_dia_status'] == "error") {
            var cant_ventas_dia_actual = 0
        } else {
            var cant_ventas_dia_actual = response_dia_actual.data['cant_ventas_dia_actual']
        }

        Vista.datosEstadisticos(cant_ventas_dia_actual, response_semana_actual, response_mes_actual);
    },

    async editarventa() {
        try {

            const valores = Vista.editarVenta();
            const res = await Modelo.actualizarDatosVenta(valores);
            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
                Vista.recargarPagina();
            } else {
                swalAlert.mostrarMensajeError("Error al actualizar la venta")
            }

        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
        }
    },

    async mostrarTodasLasVentas() {
        const res = await Modelo.traerTodasLasVentas();
        Vista.mostrarTodasLasVentas(res);
    },

    async filtrarTabla() {
        const { columnaBuscar, textoBuscar } = Vista.filtrarTabla()
        const res = await ModeloGeneral.filtrarTabla(columnaBuscar, textoBuscar)
        Vista.mostrarTodasLasVentas(res);
        Vista.mostrarFiltrosActivos(columnaBuscar, textoBuscar);
    },

    async datosPorFecha() {
        const { fecha } = Vista.tomarFecha();
        const fechaFormateada = General.formatearFechaParaEnvio(fecha);

        const fechaVacia = fechaFormateada.length;

        if (fechaVacia === 0) {
            Vista.mostrarTodasLasVentas();
        }

        const res = await ModeloGeneral.mostrarVentasPorFecha(fechaFormateada);
        Vista.mostrarTodasLasVentas(res);
        Vista.mostrarFiltrosActivos('fecha', fechaFormateada)
    },

    async datosPorIntervalo() {

        const { fechaInicio, fechaFinal } = Vista.buscarPorIntervalo()
        const fechaFormateadaInicio = General.formatearFechaParaEnvio(fechaInicio);
        const fechaFormateadaFinal = General.formatearFechaParaEnvio(fechaFinal)
        const res = await ModeloGeneral.mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);

        Vista.mostrarTodasLasVentas(res)

        // Simplemente para mostrar las fechas seleccionadas en string
        const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
        Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
    },


}
export default Controlador