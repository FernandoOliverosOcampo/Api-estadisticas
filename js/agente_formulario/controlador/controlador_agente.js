import Vista from "../vista/formulario_agente.js";
import Modelo from "../modelo/modelo_agente.js";
const Controlador = {

    unirNombreApellido(primerNombre, primerApellido) {
        const nombreFinal = primerNombre.trim();
        const apellidoFinal = primerApellido.trim();

        const usuario = `${nombreFinal.toLowerCase()}.${apellidoFinal.toLowerCase()}`
        return usuario
    },

    capitalizarTexto(texto) {
        return texto.replace(/\b\w/g, function (l) {
            return l.toUpperCase();
        });
    },

    generarNumeroAleatorio() {
        // Generar un número aleatorio entre 0 y 99999
        let numeroAleatorio = Math.floor(Math.random() * 1000000);

        // Convertir el número en una cadena y agregar ceros a la izquierda si es necesario
        let numeroComoString = numeroAleatorio.toString();
        while (numeroComoString.length < 6) {
            numeroComoString = "0" + numeroComoString;
        }

        return numeroComoString;
    },

    async insertarDatosAgente() {
        const { primerNombre, primerApellido, cedula, correo, celular, grupo, campaña, liderResponsable, liderEquipo } = Vista.enviarDatosAgente()

        const usuario = this.unirNombreApellido(primerNombre, primerApellido)
        const nombre = `${this.capitalizarTexto(primerNombre.trim())} ${this.capitalizarTexto(primerApellido.trim())}`
        const apodo = `${primerNombre.trim().toLowerCase()} ${primerApellido.trim().toLowerCase()}`
        const cedulaFinal = this.generarNumeroAleatorio(cedula);

        try {
            await Modelo.insertarAgente(apodo, nombre, usuario, cedulaFinal, correo, celular, grupo, campaña, liderResponsable, liderEquipo)
            Vista.mostrarAlertaSatisfactorio("Los datos fueron insertados correctamente")

        } catch (error) {
            console.log(error)
            Vista.mostrarMensajeError("Error al insertar los datos")
        }

    },

}
export default Controlador;