import Vista from "../vista/estadisticas.js"
import Modelo from "../modelo/modelo_estadisticas.js"

const Controlador = {

    async ventasRealizadasAgente() {
        const cedula = localStorage.getItem('cedula')
        const res = await Modelo.mostrarEstadisticas(cedula)

        // Vista.datosEstadisticos(res)
    },

    async datosAgenteGraficas() {
        const rol = localStorage.getItem('rol')
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))

        if (rol == "team leader"){
            const liderEquipo = res2.data['apodo']
            const res = await Modelo.infoEquipo(liderEquipo)
            Vista.mostrarGraficas(res)
        }

        if (rol == "agente"){
            const cedula = res2.data['cedula']
            const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
            Vista.mostrarGraficas(resAgente)
        }

    },

    async mostrarEstadisticas() {
        const rol = localStorage.getItem('rol')
        const res2 = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        
        if (rol == "agente"){
            const cedula = res2.data['cedula']
            const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
            Vista.datosEstadisticos(resAgente)
            Vista.llenarPromedios(resAgente)
        }

        if (rol == "team leader"){
            const nombre_formatear = res2.data['apodo']
            const liderEquipo = nombre_formatear.split(' ')[0];
            const res = await Modelo.mostrarEstadisticas(liderEquipo)
            Vista.datosEstadisticos(res)
            Vista.llenarPromedios(res)
        }
    },
    
    async mostrarEstadoVentasTabla(){
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        const cedula = res.data['cedula']
        const resAgente = await Modelo.mostrarEstadisticasAgente(cedula)
        Vista.mostrarTodasLasVentas(resAgente)
    }

}
export default Controlador;