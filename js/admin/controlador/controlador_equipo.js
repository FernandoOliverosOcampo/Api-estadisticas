import Modelo from "../modelo/modelo_equipo.js"
import Vista from "../vista/equipo.js"
const Controlador = {

  async ventasPorLiderEquipo() {
    const ventas_miguel = await Modelo.ventasPorLiderEquipo('miguel')
    const ventas_ray = await Modelo.ventasPorLiderEquipo('ray')
    const ventas_davina = await Modelo.ventasPorLiderEquipo('davina')
    const ventas_laureano = await Modelo.ventasPorLiderEquipo('laureano')

    Vista.mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano)

  },

  async traerAgentesPertenecientes(nombre) {
    const res2 = await Modelo.agentesPertenecientes(nombre)
    Vista.agentesPertenecientes(res2)
  },

  async ventasRealizadasAgente(nombre) {
    // const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
    const res = await Modelo.infoEquipo(nombre)
    Vista.datosEstadisticos(res)
  },

}
export default Controlador;