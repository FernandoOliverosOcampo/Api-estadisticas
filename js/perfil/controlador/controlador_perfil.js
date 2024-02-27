import Modelo from "../modelo/modelo_perfil.js"
import Vista from "../vista/perfil.js"
const Controlador = {

    async datosAgente() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula'))
        Vista.mostrarDatosUsuario(res)   
    },

    async datosModal() {
        const res = await Modelo.traerDatosPersonalesAgente(localStorage.getItem('cedula')) 
        Vista.modalAbierto(res)
    },

    async editarAgente(){
        try {
            const datos = Vista.actualizarAgentes()

            const res =  await Modelo.actualizarAgente(datos)
            if (res.status == 200){
                Vista.mostrarAlertaSatisfactorio("Se actualizo el registro de la venta correctamente");
                this.recargarPagina(2000)
            }else{
                Vista.mostrarMensajeError("No se pudo actualizar")
            }
        } catch (error) {
            console.log(error)
            let mensaje = "Hubo un error al actualizar la venta";
            Vista.mostrarMensajeError(mensaje)
        }
    },

    recargarPagina(tiempo) {
        setTimeout(function () {
          window.location.reload();
        }, tiempo);
      }
}
export default Controlador;