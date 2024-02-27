import Modelo from "../modelo/modelo_formulario.js";
import Vista from "../vista/formulario.js"
import swalAlert from "../../otros/alertas.js";

const Controlador = {

    obtenerFechaActual() {
        const fecha = new Date();

        const dia = this.agregarCeroAlInicio(fecha.getDate());
        const mes = this.agregarCeroAlInicio(fecha.getMonth() + 1); // ¡Recuerda que los meses comienzan desde 0!
        const año = fecha.getFullYear();

        return `${dia}/${mes}/${año}`;
    },

    // Función para agregar un cero al inicio si el número es menor que 10
    agregarCeroAlInicio(numero) {
        return numero < 10 ? `0${numero}` : numero;
    },

    obtenerHoraActual() {
        const fecha = new Date();

        const horas = this.agregarCeroAlInicio(fecha.getHours());
        const minutos = this.agregarCeroAlInicio(fecha.getMinutes());
        const segundos = this.agregarCeroAlInicio(fecha.getSeconds());

        return `${horas}:${minutos}:${segundos}`;
    },

    capitalizarTexto(texto) {
        return texto.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
    },

    convertirAMayusculas(texto) {
        return texto.toUpperCase();
    },

    async insertarDatos() {
        const { compania, nombre, dni, telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, iban, datos, observacionesVenta, numeroContrato, potencia, peajeGas, valorMantenimiento, valorTipoMantenimiento } = Vista.enviarDatosFormulario()

        try {

            const cedula = localStorage.getItem('cedula')
            const datos_agente = await Modelo.traerDatosPersonalesAgente(cedula)

            const nombreAgente = datos_agente.data.apodo;
            const liderEquipo = datos_agente.data.lider_equipo;
            const liderResponsable = datos_agente.data.lider_responsable;
            const fechaActual = this.obtenerFechaActual()

            await Modelo.insertarVenta(fechaActual, compania, this.capitalizarTexto(nombre), this.convertirAMayusculas(dni), telefono, correo, direccion, fechaNacimiento, cupsLuz, cupsGas, this.capitalizarTexto(iban), datos, numeroContrato, potencia, peajeGas, observacionesVenta, cedula, liderEquipo, liderResponsable, nombreAgente, valorMantenimiento, valorTipoMantenimiento,)
            let mensaje = "Los datos fueron insertados correctamente"
            swalAlert.mostrarAlertaSatisfactorio(mensaje)
            Vista.vaciarCampos();


        } catch (error) {
            console.log(error)
            swalAlert.mostrarMensajeError("Error al insertar los datos")
        }
    },

}
export default Controlador;