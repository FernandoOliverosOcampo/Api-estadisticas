import Modelo from "../modelo/modelo_admin.js";
import Vista from "../vista/admin.js";
import ModeloGeneral from "../../general/modelo/modelo_general.js"
import General from "../../general/general.js"
import swalAlert from "../../otros/alertas.js";

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

    async ventasPorLiderEquipo() {
        const ventas_miguel = await Modelo.ventasPorLiderEquipo("miguel");
        const ventas_ray = await Modelo.ventasPorLiderEquipo("ray");
        const ventas_davina = await Modelo.ventasPorLiderEquipo("davina");
        const ventas_laureano = await Modelo.ventasPorLiderEquipo("laureano");

        Vista.mostrarGraficas(
            ventas_miguel,
            ventas_ray,
            ventas_davina,
            ventas_laureano
        );
    },

    async eliminarVenta() {
        try {
            const id = Vista.eliminarVenta();
            const res = await Modelo.eliminarVenta(id.trim());

            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio("Se eliminó el registro de la venta correctamente");
                Vista.recargarPagina(500);
            } else {
                swalAlert.mostrarMensajeError("Error al eliminar la venta");
            }
        } catch (error) {
            console.log(error);
        }
    },

    async editarventa() {
        try {
            const valores = Vista.editarVenta();
            const res = await Modelo.actualizarDatosVenta(valores);
            if (res.status == 200) {
                swalAlert.mostrarAlertaSatisfactorio(
                    "Se actualizo el registro de la venta correctamente"
                );
            } else {
                swalAlert.mostrarMensajeError("Error al actualizar la venta");
            }
        } catch (error) {
            console.log(error);
            let mensaje = "Hubo un error al actualizar la venta";
            swalAlert.mostrarMensajeError(mensaje);
        }
    },

    async mostrarTodasLasVentas() {
        const res = await Modelo.traerTodasLasVentas();
        Vista.mostrarTodasLasVentas(res);
    },

    async descargarVentas() {
        try {
            const res = await Modelo.descargarCSV();
            const blob = new Blob([res.data], { type: "text/csv" });

            // Crear un enlace temporal y simular un clic para descargar el archivo
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "ventas_realizadas.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Error al descargar el archivo CSV:", error);
        }
    },

    async topMensual() {
        const res = await Modelo.ventasMesActual()
        Vista.topAgentesMes(res)
        Vista.topLideresMes(res)
        //Vista.mostrarGraficas(res)
    },

    async topSemanal() {
        const res = await Modelo.ventaAgenteSemanaActual()
        Vista.topAgentesSemana(res)
    },
    
    async filtrarTabla(){
        const { columnaBuscar, textoBuscar } = Vista.filtrarTabla();
        const res = await ModeloGeneral.filtrarTabla(columnaBuscar, textoBuscar);
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

        Vista.mostrarTodasLasVentas(res);
        const intervaloFecha = `${fechaFormateadaInicio} - ${fechaFormateadaFinal} `
        Vista.mostrarFiltrosActivos('fechas', intervaloFecha)
    },

};

export default Controlador;
