import Modelo from "../modelo/modelo_leader.js"
import Vista from "../vista/team_leader.js"
const Controlador = {


    async editarEstadoVenta(){
        const { id_venta, estado } = Vista.editarEstadoVenta()

        const res = await Modelo.editarEstadoVenta(id_venta.trim(), estado)

        if (res.status == 200){
            Vista.mostrarAlertaSatisfactorio("Estado modificado")
            Vista.recargarPagina(1000)
        }else{
            Vista.mostrarMensajeError("Ocurrió un error mientras se cambiaba el estado de la venta")
        }
    },

    async ventasRealizadasAgente() {
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        const nombre_formatear = res2.data['apodo']
        const liderEquipo = nombre_formatear.split(' ')[0];

        const res = await Modelo.infoEquipo(liderEquipo)
        Vista.datosEstadisticos(res)
        Vista.mostrarTablaDatos(res)
    },

    async datosAgenteGraficas() {
        const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
        Vista.mostrarGraficas(res)
    },

    async buscarDatosPersonalesAgente() {
        const { combobox } = Vista.traerCedulaAgente();
        const res = await Modelo.traerDatosPersonalesAgente(combobox)
        //const res2 = await Modelo.traerVentasRealizadasAgente(cedulaAgente)

        const res3 = await Modelo.mostrarEstadisticas(combobox);

        Vista.llenarDatosPersonalesAgente(res)
        Vista.llenarEstadisticasAgente(res3)
    },

    async traerAgentesPertenecientes() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        const nombre_formatear = res.data['apodo']
        const liderEquipo = nombre_formatear.split(' ')[0];
        const res2 = await Modelo.agentesPertenecientes(liderEquipo)
        Vista.agentesPertenecientes(res2)
        Vista.comboboxBuscarAgente(res2)
    }

}
export default Controlador;