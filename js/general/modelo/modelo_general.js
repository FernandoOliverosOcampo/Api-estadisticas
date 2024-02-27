import config from '../../supabase/keys.js';

const Modelo = {
    
    async traerDatosPersonalesAgente(cedula) {

        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
            method: "GET",
            url: "https://equitisoporte.pythonanywhere.com/mostrar-datos-personales/" + cedula,
            headers: config.headers,
        });
        return res
    },
    async traerTodasLasVentas() {
        //se almacena la respuesta en "res" para obtener el resultado de la petición y retornarla para mostrar en la vista
        const res = axios({
          method: "GET",
          url: "https://equitisoporte.pythonanywhere.com/mostrar-ventas/",
          headers: config.headers,
        });
        return res
      },
        
      async mostrarVentasPorFecha(fechaFormateada){
    
        const datos_enviar = {
          fecha_venta: fechaFormateada
        }
    
        const res = await axios({
          method: "POST",
          url: "https://equitisoporte.pythonanywhere.com/mostrar-por-fecha/",
          headers: config.headers,
          data: datos_enviar
          
        });
        return res
      },
    
      async mostrarVentasPorEstado(estado){
    
        const datos_enviar = {
          estado: estado
        }
    
        const res = await axios({
          method: "POST",
          url: "https://equitisoporte.pythonanywhere.com/mostrar-por-estado/",
          headers: config.headers,
          data: datos_enviar
          
        });
        return res
      },
    
      async mostrarPorIntervalo(fechaFormateadaInicio, fechaFormateadaFinal){
   
        const datosEnviar ={
          fecha_inicial: fechaFormateadaInicio,
          fecha_final: fechaFormateadaFinal
        }
    
        const res = await axios({
          method: "POST",
          url: "https://equitisoporte.pythonanywhere.com/mostrar-por-intervalo/",
          headers: config.headers,
          data: datosEnviar
        })
        return res
      },

      async filtrarTabla(columnaBuscarValor, textoBuscar){

        const datosEnviar ={
            columna_buscar: columnaBuscarValor,
            texto_buscar: textoBuscar
        }

        console.log(datosEnviar)
        const res = await axios({
          method: "POST",
          url: "https://equitisoporte.pythonanywhere.com/filtrar-tabla/",
          headers: config.headers,
          data: datosEnviar
        })
        return res
      },
      
      async editarEstadoDesdeTabla(idVenta, estadoo){
   
        const infoEstado ={
          estado: estadoo,
          id_venta: idVenta
        }
    
        const res = await axios({
          method: "PUT",
          url: "https://equitisoporte.pythonanywhere.com/editar-venta-estado/",
          data: infoEstado,
          headers: config.headers,
        });
        return res
        
      },
    
}
export default Modelo;