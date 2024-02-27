import Controlador from "../controlador/controlador_formulario.js"
import General from "../../general/general.js"

const Vista = {

    opcionesMenu() {
        if (localStorage.getItem("access_token")) {
            const contenidoPerfil = document.getElementById("contenidoPerfil");
            if (localStorage.getItem("rol") == "team leader") {
                contenidoPerfil.innerHTML = `
                    <div class="enlaces">
                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-house"></i>
                            </div>

                            <div class="texto">
                                <button><a href= "../home.html">Inicio</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "../pages/perfil.html">Mi perfil</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "../pages/team_leader/inicio_team_leader.html">Mi equipo</a></button>
                            </div>
                        </div>

                        
                        <div class="enlace">
                        <div class="icono">
                            <i class="fa-solid fa-user"></i>
                        </div>
            
                        <div class="texto">
                            <button><a href= "../pages/formulario_ventas.html">Añadir Venta</a></button>
                        </div>
                    </div>
                        </div>
                    </div>
                
                    <div class="pie-menu">
                
                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </div>
                
                            <div class="texto">
                                <button id = "cerrarSesion">Cerrar sesión</button>
                            </div>
                        </div>
                    </div>      
                `;
            }

            if (localStorage.getItem("rol") == "agente") {
                contenidoPerfil.innerHTML = `
          <div class="enlaces">
            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-house"></i>
                </div>

                <div class="texto">
                    <button><a href= "../home.html">Inicio</a></button>
                </div>
            </div>

            <div class="enlace">
              <div class="icono">
                  <i class="fa-solid fa-user"></i>
              </div>
    
              <div class="texto">
                <button><a href= "../pages/perfil.html">Mi perfil</a></button>
              </div>
            </div>

            <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-user"></i>
            </div>
  
            <div class="texto">
                <button><a href= "../pages/formulario_ventas.html">Añadir Venta</a></button>
            </div>
          </div>
            </div>
        </div>
        <div class="enlace">
            <div class="icono">
            <i class="fa-solid fa-location-crosshairs"></i>
            </div>
  
            <div class="texto">
                <button><a href= "../pages/codigos_postales.html">Codigos postales</a></button>
            </div>
          </div>
            </div>
        </div>
    
        <div class="pie-menu">
    
            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>
    
                <div class="texto">
                    <button id = "cerrarSesion">Cerrar sesión</button>
                </div>
            </div>
        </div>      
                `;
            }

            if (localStorage.getItem("rol") == "admin") {
                contenidoPerfil.innerHTML = `
        <div class="enlaces">
            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-house"></i>
                </div>

                <div class="texto">
                    <button><a href= "./admin.html">Inicio</a></button>
                </div>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="texto">
                    <button><a href= "./perfil.html">Mi perfil</a></button>
                </div>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-people-group"></i>
                </div>

                <div class="texto">
                    <button><a href= "./admin/equipo.html">Equipos</a></button>
                </div>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-headset"></i>
                </div>

                <div class="texto">
                    <button><a href= "./formulario_ventas.html">Ventas</a></button>
                </div>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-user"></i>
                </div>

                <div class="texto">
                <button><a href= "./registro_agentes.html">Registrar agente</a></button>
                </div>
            </div>

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-file-pen"></i>
                </div>

                <div class="texto">
                    <button><a href="https://docs.google.com/forms/d/1zmWZxi-XVMlfp2KE7dv9EEhqIPYGcDDSZY75K1s4lDU/viewform?pli=1&pli=1&edit_requested=true" target="_blank" >Reporte diario</a></button>
                </div>
            </div>

            </div>
        </div>

        <div class="pie-menu">

            <div class="enlace">
                <div class="icono">
                    <i class="fa-solid fa-right-from-bracket"></i>
                </div>

                <div class="texto">
                    <button id = "cerrarSesion">Cerrar sesión</button>
                </div>
            </div>
        </div>      
      `;
            }

            const botonCerrarSesion = document.getElementById("cerrarSesion");
            botonCerrarSesion.onclick = function () {
                localStorage.clear();
                location.href = "../pages/login.html";
            };
        } else {
            location.href = "../pages/login.html";
        }
    },

    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
            text: mensaje,
        })
    },

    mostrarMensajeAdvertencia(mensaje) {
        Swal.fire({
            icon: 'warning',
            title: 'Faltan campos por llenar',
            text: mensaje,
        })
    },

    mostrarAlertaSatisfactorio(mensaje) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: mensaje,
            showConfirmButton: false,
            timer: 1500
        })
    },

    formatearFechaParaEnvio(fecha) {
        // Formatea la fecha en el formato deseado (dd/mm/yyyy)
        if (fecha.length == 0) {
            return fecha

        } else {
            var partes = fecha.split('-');
            var fechaFormateada = partes[2] + '/' + partes[1] + '/' + partes[0];

            return fechaFormateada
        }
    },
    quitarBordeRojo(event) {
        event.target.style.borderColor = ""; // Restablecer el borde a su estado original
    },

    enviarDatosFormulario() {
        
        //const fechaFormatear = document.getElementById('fecha').value;
        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        //const fechaVentaFormatear = document.getElementById('fechaVenta').value;

        //const fecha = this.formatearFechaParaEnvio(fechaFormatear);
        //const fechaVenta = this.formatearFechaParaEnvio(fechaVentaFormatear);

        //const hora = document.getElementById('hora').value;
        const compania = document.getElementById('compania').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const fechaNacimiento = this.formatearFechaParaEnvio(fechaNacimientoFormatear);
        const cupsLuz = document.getElementById('cupsLuz').value;
        const cupsGas = document.getElementById('cupsGas').value;
        const iban = document.getElementById('iban').value;
        const datos = document.getElementById('datos').value;
        const numeroContrato = document.getElementById('numeroContrato').value;
        const potencia = document.getElementById('potencia').value;
        const peajeGas = document.getElementById('peajeGas').value;
        const observacionesVenta = document.getElementById('observacionesVenta').value;   
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');
    
        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;
       
        const  camposVacios =[]
        if (nombre === "" ||  dni === "" || telefono === "" || direccion === "" || cupsLuz === "" || iban === "" || numeroContrato === "" ){
            const campos = ['nombre', 'dni', 'telefono', 'direccion', 'cupsLuz', 'iban', 'numeroContrato'];

            campos.forEach(campo => {
                const input = document.getElementById(campo);
                const valor = input.value.trim();
                if (valor === "") {
                    input.style.borderColor = "red"; // Marcar el campo vacío en rojo
                    input.addEventListener('input', this.quitarBordeRojo); // Agregar evento para quitar el borde rojo al escribir
                    camposVacios.push(campo);
                } else {
                    input.style.borderColor = ""; // Restablecer el borde a su estado original
                }
            });
            //llenar mensajes
            this.mostrarMensajeAdvertencia(`Campos vacios, verifica que  el/los campo(s): ${camposVacios.join(', ')} esten llenos.`)
            

        }
        else if (compania === "Iberdrola (fuera de península)" || compania === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)"){
            if (numeroContrato.length == 0){
                this.mostrarMensajeAdvertencia("Tienes que llenar el campo numero del contrato")
            }else{
                //AGREGAR POTENCIA Y EMPUJO
                return {
                    compania,
                    nombre,
                    dni,
                    telefono,
                    correo,
                    direccion,
                    fechaNacimiento,
                    cupsLuz,
                    cupsGas,
                    iban,
                    datos,
                    observacionesVenta,
                    numeroContrato,
                    potencia,
                    peajeGas,
                    valorMantenimiento,
                    valorTipoMantenimiento,
                };
            }
        }else{
            
            return {
                compania,
                nombre,
                dni,
                telefono,
                correo,
                direccion,
                fechaNacimiento,
                cupsLuz,
                cupsGas,
                iban,
                datos,
                observacionesVenta,
                numeroContrato,
                potencia,
                peajeGas,
                valorMantenimiento,
                valorTipoMantenimiento,
            };
        }
    },

    vaciarCampos(){
        document.getElementById('nombre').value = ""
        document.getElementById('dni').value = ""
        document.getElementById('telefono').value = ""
        document.getElementById('correo').value = ""
        document.getElementById('direccion').value = ""
        //document.getElementById('fechaNacimiento').value = ""
        document.getElementById('cupsLuz').value = ""
        document.getElementById('cupsGas').value = ""
        document.getElementById('iban').value = ""
        document.getElementById('observacionesVenta').value = ""
        document.getElementById('numeroContrato').value = ""
        document.getElementById('potencia').value = ""
        document.getElementById('peajeGas').value = ""
    },

    createTipoMantenimientoOptions(){
        const combobox = document.getElementById('compania');
        const seleccion = combobox.value;
        const tipo = this.value;
        // Remove existing tipo mantenimiento label and input
        const existingTipoLabel = document.getElementById('tipoLabel');
        const existingTipoInput = document.getElementById('tipoMantenimiento');
        if (existingTipoLabel) existingTipoLabel.remove();
        if (existingTipoInput) existingTipoInput.remove();
        
        const tipoMantenimientolabel = document.createElement('label');
        tipoMantenimientolabel.textContent = 'Tipo mantenimiento:';
        tipoMantenimientolabel.setAttribute('id', 'tipoLabel');

        const tipoMantenimientoInput = document.createElement('select');
        tipoMantenimientoInput.setAttribute('name', 'tipoMantenimiento');
        tipoMantenimientoInput.setAttribute('id', 'tipoMantenimiento');
        if (tipo === 'Luz') {

                if(seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)'){
                    tipoMantenimientoInput.innerHTML = `
                        <option value="Pack iberdrola" selected>Pack iberdrola</option>
                    `;  
                }

                if (seleccion === 'Naturgy'){

                    tipoMantenimientoInput.innerHTML = `
                        <option value="Svh: servihogar plus" selected>Svh: servihogar plus</option>
                        <option value="Sve: servielevtric xpress piezas">Sve: servielevtric xpress piezas</option>
                        <option value="Sve y svh">Sve y svh</option>
                    `;  
                
                }
                     
            form.appendChild(tipoMantenimientolabel);
            form.appendChild(tipoMantenimientoInput);

        }
        else if (tipo === "Luz y gas"){

                if(seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)"){
        
                    tipoMantenimientoInput.innerHTML = `
                        <option value="Pack iberdrola" selected>Pack iberdrola</option>
                        <option value="Mantenimiento gas">Mantenimiento gas</option>
                        <option value="Pack iberdrola y mantenimiento gas">Pack iberdrola y mantenimiento gas</option>

                    `;     
                }
            
                if (seleccion === 'Naturgy'){
                
                    tipoMantenimientoInput.innerHTML = `
                        <option value="Svh: servihogar plus" selected>Svh: servihogar plus</option>
                        <option value="Sve: servielevtric xpress piezas">Sve: servielevtric xpress piezas</option>
                        <option value="Svg: servigas complet" selected>Svg: servigas complet</option>
                        <option value="Svh y Svg">Svh y Svg</option>
                        <option value="Sve y Svg">Sve y Svg</option>
                        <option value="Svh Sve y Svg">Svh Sve y Svg</option>
                    `;
                }
                form.appendChild(tipoMantenimientolabel);
                form.appendChild(tipoMantenimientoInput);

        }
        else if(tipo === "Gas"){

                if(seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)"){
        
                    tipoMantenimientoInput.innerHTML = `
                        <option value="Mantenimiento gas">Mantenimiento gas</option>

                    `;     
                }
            
                if (seleccion === 'Naturgy'){
                
                    tipoMantenimientoInput.innerHTML = `
                    <option value="Svg: servigas complet" selected>Svg: servigas complet</option>
                   
                `;
                }
       
       
            form.appendChild(tipoMantenimientolabel);
            form.appendChild(tipoMantenimientoInput);
            
        }
        else{
            if (existingTipoLabel) existingTipoLabel.remove();
            if (existingTipoInput) existingTipoInput.remove();
        }
    },

    enviarValores() {
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');
    
        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;
    
        Vista.enviarDatosFormulario(valorMantenimiento, valorTipoMantenimiento);
    }
}

export default Vista;
document.addEventListener('DOMContentLoaded', function () {
    Vista.opcionesMenu();
    General.horaActual()
    setInterval(General.horaActual, 1000);
    
});

const botonEnter = document
botonEnter.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
        const compania = document.getElementById('compania').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const direccion = document.getElementById('direccion').value;
        const fechaNacimiento = Vista.formatearFechaParaEnvio(fechaNacimientoFormatear);
        const cupsLuz = document.getElementById('cupsLuz').value;
        const cupsGas = document.getElementById('cupsGas').value;
        const iban = document.getElementById('iban').value;
        const datos = document.getElementById('datos').value;
        const numeroContrato = document.getElementById('numeroContrato').value;
        const potencia = document.getElementById('potencia').value;
        const peajeGas = document.getElementById('peajeGas').value;
        const observacionesVenta = document.getElementById('observacionesVenta').value;   
        const valorMantenimientoElement = document.getElementById('mantenimiento');
        const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');
    
        // Verificar si los elementos select existen antes de intentar acceder a sus valores
        const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
        const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;
    
        const htmlContent = `
        <div style="max-height: 265px; overflow-y: auto;">
            <h3>Valores ingresados:</h3>
            <p>Compañia: ${compania}</p>
            <p>Mantenimiento: ${valorMantenimiento || 'no dado'}</p>
            <p>Tipo mantenimiento: ${valorTipoMantenimiento || 'no dado'}</p>
            <p>Nombre: ${nombre}</p>
            <p>DNI: ${dni || 'no dado'}</p>
            <p>Telefono: ${telefono}</p>
            <p>Correo: ${correo || 'no dado'}</p>
            <p>Dirección: ${direccion || 'no dado'}</p>
            <p>Fecha de nacimiento: ${fechaNacimiento|| 'no dado'}</p>
            <p>Cups luz: ${cupsLuz}</p>
            <p>Cups gas: ${cupsGas || 'no dado'}</p>
            <p>IBAN: ${iban || 'no dado'}</p>
            <p>Datos: ${datos || 'no dado'}</p>
            <p>Numero de contrato: ${numeroContrato || 'no dado'}</p>
            <p>Potencia: ${potencia || 'no dado'}</p>
            <p>Peaje: ${peajeGas || 'no dado'}</p>
            <p>Observacion venta: ${observacionesVenta}</p>
        </div>
        `;        
          Swal.fire({
            title: '¿Estás seguro?',
            // text: '¿Deseas ingresar esta venta en la Base de datos?',
            icon: 'warning',
            html:htmlContent,
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                Controlador.insertarDatos()
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'No se ha ingresado nada',
                'error'
              );
            }
          });
    }
});

const buttonRegistrar = document.getElementById('enviar');
buttonRegistrar.onclick = function () {
    const fechaNacimientoFormatear = document.getElementById('fechaNacimiento').value;
    const compania = document.getElementById('compania').value;
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const fechaNacimiento = Vista.formatearFechaParaEnvio(fechaNacimientoFormatear);
    const cupsLuz = document.getElementById('cupsLuz').value;
    const cupsGas = document.getElementById('cupsGas').value;
    const iban = document.getElementById('iban').value;
    const datos = document.getElementById('datos').value;
    const numeroContrato = document.getElementById('numeroContrato').value;
    const potencia = document.getElementById('potencia').value;
    const peajeGas = document.getElementById('peajeGas').value;
    const observacionesVenta = document.getElementById('observacionesVenta').value;   
    const valorMantenimientoElement = document.getElementById('mantenimiento');
    const valorTipoMantenimientoElement = document.getElementById('tipoMantenimiento');

    if (compania === "no seleccionado"){
        Vista.mostrarMensajeAdvertencia("Es necesario que selecciones una compañia")
    }else{


    // Verificar si los elementos select existen antes de intentar acceder a sus valores
    const valorMantenimiento = valorMantenimientoElement ? valorMantenimientoElement.value : null;
    const valorTipoMantenimiento = valorTipoMantenimientoElement ? valorTipoMantenimientoElement.value : null;

    const htmlContent = `
    <div style="max-height: 265px; overflow-y: auto;">
        <h3>Valores ingresados:</h3>
        <p>Compañia: ${compania}</p>
        <p>Mantenimiento: ${valorMantenimiento || 'no dado'}</p>
        <p>Tipo mantenimiento: ${valorTipoMantenimiento || 'no dado'}</p>
        <p>Nombre: ${nombre}</p>
        <p>DNI: ${dni || 'no dado'}</p>
        <p>Telefono: ${telefono}</p>
        <p>Correo: ${correo || 'no dado'}</p>
        <p>Dirección: ${direccion || 'no dado'}</p>
        <p>Fecha de nacimiento: ${fechaNacimiento|| 'no dado'}</p>
        <p>Cups luz: ${cupsLuz}</p>
        <p>Cups gas: ${cupsGas || 'no dado'}</p>
        <p>IBAN: ${iban || 'no dado'}</p>
        <p>Datos: ${datos || 'no dado'}</p>
        <p>Numero de contrato: ${numeroContrato || 'no dado'}</p>
        <p>Potencia: ${potencia || 'no dado'}</p>
        <p>Peaje: ${peajeGas || 'no dado'}</p>
        <p>Observacion venta: ${observacionesVenta}</p>
    </div>
    `;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    
      swalWithBootstrapButtons.fire({
        title: '¿Estás seguro?',
        // text: '¿Deseas ingresar esta venta en la Base de datos?',
        icon: 'warning',
        html:htmlContent,
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Controlador.insertarDatos()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'No se ha ingresado nada',
            'error'
          );
        }
      });

    }
    
}



const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
    if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
        opcionesPerfil.style.display = "block";
    } else {
        opcionesPerfil.style.display = "none";
    }
};

//AGREGAR NUEVOS CAMPOS
const form = document.getElementById('companiaSeccion');
const combobox = document.getElementById('compania');
const tipomante = Vista.createTipoMantenimientoOptions

combobox.addEventListener('change', () => {
    const seleccion = combobox.value;

    // Remove existing labels and inputs
    const existingLabel = document.getElementById('label');
    const existingInput = document.getElementById('mantenimiento');
    const existingTipoLabel = document.getElementById('tipoLabel');
    const existingTipoInput = document.getElementById('tipoMantenimiento');

    if (existingLabel) existingLabel.remove();
    if (existingInput) existingInput.remove();

    if(seleccion === "no seleccionado"){
        alert("Tienes que seleccionar una compañia")
    }

    if (seleccion === 'Naturgy' || seleccion === 'Iberdrola (fuera de península)' || seleccion === 'Iberdrola (Cataluña, Aragón, Baleares, Canarias)') {
        const mantenimientolabel = document.createElement('label');
        mantenimientolabel.textContent = 'Mantenimiento:';
        mantenimientolabel.setAttribute('id', 'label');

        const mantenimientoInput = document.createElement('select');
        mantenimientoInput.setAttribute('name', 'mantenimiento');
        mantenimientoInput.setAttribute('id', 'mantenimiento');
        mantenimientoInput.innerHTML = `
            <option value="Sin mantenimiento" selected>Sin mantenimiento</option>
            <option value="Luz y gas">Luz y gas</option>
            <option value="Luz">Luz</option>
            <option value="Gas">Gas</option>
        `;
       
        form.appendChild(mantenimientolabel);
        form.appendChild(mantenimientoInput);
        mantenimientoInput.addEventListener('change', tipomante);
        if (existingTipoLabel) existingTipoLabel.remove();
        if (existingTipoInput) existingTipoInput.remove();
    }else{
    
        if (existingTipoLabel) existingTipoLabel.remove();
        if (existingTipoInput) existingTipoInput.remove();
    }

    if (seleccion === "Iberdrola (fuera de península)" || seleccion === "Iberdrola (Cataluña, Aragón, Baleares, Canarias)"){
        const numeroContrato = document.getElementById('numeroContrato')
        numeroContrato.required = 'true';
    }
    return {
        seleccion
    }

});

