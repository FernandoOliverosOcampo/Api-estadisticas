import swalAlert from "../../otros/alertas.js"
import Modelo from "../modelo/home_modelo.js"
import Vista from "../vista/home.js"
const Controlador = {

  async ventasRealizadasAgente() {
    const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))

    Vista.mostrarTablaDatos(res)
    Vista.datosEstadisticos(res)
  },

  async datosAgenteGraficas() {
    const res = await Modelo.traerVentasRealizadasAgente(localStorage.getItem('cedula'))
    Vista.mostrarGraficas(res)
  },

  async editarventa() {
    try {
      const valores = Vista.editarVenta();
      const res = await Modelo.actualizarDatosVenta(valores);

      if (res.status == 200) {
        swalAlert.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
      } else {
        swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
      }
      
    } catch (error) {
      console.log(error)
      swalAlert.mostrarMensajeError("Hubo un error al actualizar la venta")
    }
  },


}
export default Controlador;