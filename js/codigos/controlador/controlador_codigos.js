import Modelo from "../modelo/modelo_codigos.js";
import Vista from "../vista/codigos.js";
const Controlador = {
    async datosCodigoPostal() {
        const { codigo } = Vista.codigoPostalBuscar();
        const res = await Modelo.traerInfoCodigosPostales(codigo)

        Vista.mostrarDatosCodigo(res)
    },
}
export default Controlador;