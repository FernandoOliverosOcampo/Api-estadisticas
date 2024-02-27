import Modelo from "../modelo/modelo_general.js";
import General from "../general.js";
const ControladorGeneral = {

    async datosAgente() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        General.datosAgente(res)
    },

    formatearFechaParaEnvio(fecha) {
        // Formatea la fecha en el formato deseado (dd/mm/yyyy)
        if (fecha.length == 0) {
            return fecha;
        } else {
            let meses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var partes = fecha.split("-");

            if (partes[2].includes(meses)){
                var fechaFormateada = partes[2].replace("0", "") + "/" + partes[1] + "/" + partes[0];
            }else{
                var fechaFormateada = partes[2]+ "/" + partes[1] + "/" + partes[0];
            }

            return fechaFormateada;
        }
    },

    async datosPorFecha() {
        const { fecha } = General.tomarFecha();
        const fechaFormateada = this.formatearFechaParaEnvio(fecha);

        const fechaVacia = fechaFormateada.length;
        if (fechaVacia === 0) {
            this.mostrarTodasLasVentas()
        }
        const res = await Modelo.mostrarVentasPorFecha(fechaFormateada);
        General.mostrarTodasLasVentas(res);
    },

    async datosPorEstado(estado) {
        const res = await Modelo.mostrarVentasPorEstado(estado);

        General.mostrarTodasLasVentas(res);
    },

    async datosPorIntervalo() {

        const { fechaInicio, fechaFinal } = General.buscarPorIntervalo()

        const fechaFormateadaInicio = this.formatearFechaParaEnvio(fechaInicio);
        const fechaFormateadaFinal = this.formatearFechaParaEnvio(fechaFinal)

        const res = await Modelo.mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal);

        General.mostrarTodasLasVentas(res)
    },

    async mostrarTodasLasVentas() {
        const res = await Modelo.traerTodasLasVentas();
        General.mostrarTodasLasVentas(res);    
    },

    async filtrarTabla(){

        const { columnaBuscar, textoBuscar } = General.filtrarTabla()

        const res = await Modelo.filtrarTabla(columnaBuscar, textoBuscar)
        General.mostrarTodasLasVentas(res)
    }

}
export default ControladorGeneral;