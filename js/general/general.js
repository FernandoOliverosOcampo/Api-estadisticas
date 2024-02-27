import ControladorGeneral from "./controlador/controlador_general.js";
import Modelo from "./modelo/modelo_general.js";

const General = {

    modalIncrustado(targetModal, btnAbrir, claseCerrarModal) {

        /* MODAL Agregar datos */
        var modal = document.getElementById(targetModal);
        var btnAbrirModal = document.getElementById(btnAbrir);
        var btnCerrarModal = document.getElementsByClassName(claseCerrarModal)[0];

        btnAbrirModal.onclick = function () {
            modal.style.display = "block";
        }

        btnCerrarModal.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    },

    modalCero(targetModal, claseCerrarModal) {

        /* MODAL Agregar datos */
        var modal = document.getElementById(targetModal);
        //var btnAbrirModal = document.getElementById(btnAbrir);
        //var btnCerrarModal = document.getElementsByClassName(claseCerrarModal)[0];

        //btnAbrirModal.onclick = function () {
        modal.style.display = "block";
        //}

        //btnCerrarModal.onclick = function () {
        //    modal.style.display = "none";
        //}

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    },

    modalContenido(modalCuerpo, modalCabecera, dato) {
       
        const calidad = dato['llamada_calidad']
        const envioCalidad = dato['calidad_enviada']
        const verificacionCalidad = dato['verificacion_calidad']
        const audio = dato['audios_cargados']
        const legalizacion = dato['legalizacion']
        const estado = dato['estado']

        if (calidad == calidad || envioCalidad == "pendiente" || verificacionCalidad == "pendiente" || audio == "pendiente" || legalizacion == "pendiente"  || estado == estado){
                modalCabecera.innerHTML =
                `
                    <h1>Información</h1>
                `
                    modalCuerpo.innerHTML =
                `
                    <div class="informacion-agente-venta">
                        <h3>Informacion agente</h3>
                                
                        <div class="informacion-agente">
                            <p>Id venta:</p>
                            <p id = "idVenta" ><i class="fa-solid fa-hashtag"></i> ${dato['id']}</p>
                            <p><i class="fa-solid fa-calendar-days"></i> Fecha: ${dato['fecha_ingreso_venta']}</p>
                            <p><i class="fa-solid fa-people-group"></i> Lider Equipo: ${dato['lider_equipo']}</p>
                            <p><i class="fa-solid fa-address-card"></i>Cedula:</p>
                            <p id = "cedula" >${dato['cedula']}</p>
                            <p><i class="fa-solid fa-user"></i> Agente: ${dato['nombre_agente']}</p>
                            <p><i class="fa-solid fa-database"></i> Base de datos: ${dato['base_de_datos']}</p>                      
                        </div>

                    </div>

                    
                    <div class="informacion-editar">

                        <div class="contenido-venta">
                        <h3>Informacion venta</h3>

                        <div class="campo compania">
                            <div class="texto">
                                <p>Compañia:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoCompañiaEditar" type = "text" value = "${dato['compania']}">
                            </div>
                        </div>

                        <div class="campo dni">
                            <div class="texto">
                                <p>DNI:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoDniEditar" type = "text" value = "${dato['dni']}">
                            </div>
                        </div>

                        <div class="campo nombre">
                            <div class="texto">
                                <p>Nombre:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoNombreEditar" type = "text" value = "${dato['nombre']}">
                            </div>
                        </div>

                        <div class="campo telefono">
                            <div class="texto">
                                <p>Telefono:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoTelefonoEditar" type = "text" value = "${dato['telefono']}">
                            </div>
                        </div>

                        <div class="campo correo">
                            <div class="texto">
                                <p>Correo:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoCorreoEditar" type = "text" value = "${dato['correo']}">
                            </div>
                        </div>

                        <div class="campo direccion">
                            <div class="texto">
                                <p>Dirección:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoDireccionEditar" type = "text" value = "${dato['direccion']}">
                                <p></p>
                            </div>
                        </div>

                        <div class="campo fecha-nacimiento">
                            <div class="texto">
                                <p>Fecha de nacimiento:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoFechaNacimientoEditar" type = "text" value = "${dato['fecha_nacimiento']}">
                            </div>
                        </div>

                        <div class="campo cups-luz">
                            <div class="texto">
                                <p>CUPS LUZ:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoCupsLuzEditar" type = "text" value = "${dato['cups_luz']}">
                            </div>
                        </div>

                        <div class="campo cups-gas">
                            <div class="texto">
                                <p>CUPS GAS:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoCupsGasEditar" type = "text" value = "${dato['cups_gas']}">
                            </div>
                        </div>

                        <div class="campo iban">
                            <div class="texto">
                                <p>IBAN:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoIbanEditar" type = "text" value = "${dato['iban']}">
                            </div>
                        </div>

                        <div class="campo numero-contrato">
                            <div class="texto">
                                <p>Numero de Contrato:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoNumeroContratoEditar" type = "text" value = "${dato['numero_contrato']}">
                            </div>
                        </div>

                        <div class="campo potencia">
                            <div class="texto">
                                <p>POTENCIA:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoPotenciaEditar" type = "text" value = "${dato['potencia']}">
                                <p></p>
                            </div>
                        </div>

                        <div class="campo peajeGas">
                            <div class="texto">
                                <p>PEAJE GAS:</p>
                            </div>
                            <div class="entrada">
                                <input id = "campoPeajeGasEditar" type = "text" value = "${dato['peaje_gas']}">
                            </div>
                        </div>

                        <div class="campo descripcion-venta">
                            <div class="texto">
                                <p>Observaciones venta:</p>
                            </div>
                            <div class="entrada">
                                <textarea id="observacionesVenta" disabled>${dato['observaciones_venta']}</textarea>
                            </div>
                        </div>


                    </div>

                    <div class="contenido-editable">
                        <h3>Informacion editabe</h3>
                        <div class="campo llamada-calidad">
                            <div class="texto">
                                <p>Llamada calidad:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="llamadaCalidadComboBoxCampoEditar">
                                    <option value="${dato['llamada_calidad']}">${dato['llamada_calidad']}</option>
                                    <option value="corregida">Corregida</option>
                                
                                    <option value="realizada">Realizada</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo calidad-enviada">
                            <div class="texto">
                                <p>Calidad enviada:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="calidadEnviadaComboBoxCampoEditar">
                                    <option value="${dato['calidad_enviada']}">${dato['calidad_enviada']}</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo verificacion-calidad">
                            <div class="texto">
                                <p>Verificación calidad:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="verificacionComboBoxCampoEditar">
                                    <option value="${dato['verificacion_calidad']}">${dato['verificacion_calidad']}</option>
                                    <option value="cumple calidad">Cumple calidad</option>
                                    <option value="no cumple calidad">No cumple calidad</option>
                                    
                                </select>
                            </div>
                        </div>

                        <div class="campo audios-cargados">
                            <div class="texto">
                                <p>Audios cargados:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="audiosCargadosComboBoxCampoEditar">
                                    <option value="${dato['audios_cargados']}">${dato['audios_cargados']}</option>
                                    <option value="si">Si</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo descripcion">
                            <div class="texto">
                                <p>Observaciones calidad:</p>
                            </div>
                            <div class="entrada">
                                <textarea id="observacionesCalidadCampoEditar">${dato['observaciones_calidad']}</textarea>
                            </div>
                        </div>

                        
                        <div class="campo legalizacion">
                            <div class="texto">
                                <p>Legalización:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="legalizacion">
                                    <option value="${dato['legalizacion']}">${dato['legalizacion']}</option>
                                    <option value="Naturgy">Naturgy</option>
                                    <option value="Iberdrola">Iberdrola</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo estado">
                            <div class="texto">
                                <p>Estado:</p>
                            </div>
                            <div class="entrada">
                                <select name="" id="estadoComboBoxCampoEditar">
                                <option value="${dato['estado']}">${dato['estado']}</option>
                                <option value="activa">Activa</option>
                                <option value="temporal">Temporal</option>
                                <option value="baja">Baja</option>
                                <option value="firmado">Firmado</option>
                                <option value="verificado">Verificado</option>
                                <option value="cancelada">Cancelada</option>
                                <option value="desistimiento">Desistimiento</option>
                                <option value="devuelta">Devuelta</option>
                                </select>
                            </div>
                        </div>

                        <div class="campo descripcion">
                            <div class="texto">
                                <p>Observaciones adicionales:</p>
                            </div>
                            <div class="entrada">
                                <textarea id="observacionesAdicionalesCampoEditar">${dato['observaciones_adicionales']}</textarea>
                            </div>
                        </div>
                    </div>

                 </div>
        
                `
        return modalCabecera, modalCuerpo
        } else{
            modalCabecera.innerHTML =
            `
                <h1>Información</h1>
            `
                modalCuerpo.innerHTML =
            `
                <div class="informacion-agente-venta">
                    <h3>Informacion agente</h3>
                            
                    <div class="informacion-agente">
                        <p>Id venta:</p>
                        <p id = "idVenta" ><i class="fa-solid fa-hashtag"></i> ${dato['id']}</p>
                        <p><i class="fa-solid fa-calendar-days"></i> Fecha: ${dato['fecha_ingreso_venta']}</p>
                        <p><i class="fa-solid fa-people-group"></i> Lider Equipo: ${dato['lider_equipo']}</p>
                        <p><i class="fa-solid fa-address-card"></i>Cedula:</p>
                        <p id = "cedula" >${dato['cedula']}</p>
                        <p><i class="fa-solid fa-user"></i> Agente: ${dato['nombre_agente']}</p>
                        <p><i class="fa-solid fa-database"></i> Base de datos: ${dato['base_de_datos']}</p>                      
                    </div>

                </div>

                
                <div class="informacion-editar">

                    <div class="contenido-venta">
                    <h3>Informacion venta</h3>

                    <div class="campo compania">
                        <div class="texto">
                            <p>Compañia:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoCompañiaEditar" type = "text" value = "${dato['compania']}">
                        </div>
                    </div>

                    <div class="campo dni">
                        <div class="texto">
                            <p>DNI:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoDniEditar" type = "text" value = "${dato['dni']}">
                        </div>
                    </div>

                    <div class="campo nombre">
                        <div class="texto">
                            <p>Nombre:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoNombreEditar" type = "text" value = "${dato['nombre']}">
                        </div>
                    </div>

                    <div class="campo telefono">
                        <div class="texto">
                            <p>Telefono:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoTelefonoEditar" type = "text" value = "${dato['telefono']}">
                        </div>
                    </div>

                    <div class="campo correo">
                        <div class="texto">
                            <p>Correo:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoCorreoEditar" type = "text" value = "${dato['correo']}">
                        </div>
                    </div>

                    <div class="campo direccion">
                        <div class="texto">
                            <p>Dirección:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoDireccionEditar" type = "text" value = "${dato['direccion']}">
                            <p></p>
                        </div>
                    </div>

                    <div class="campo fecha-nacimiento">
                        <div class="texto">
                            <p>Fecha de nacimiento:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoFechaNacimientoEditar" type = "text" value = "${dato['fecha_nacimiento']}">
                        </div>
                    </div>

                    <div class="campo cups-luz">
                        <div class="texto">
                            <p>CUPS LUZ:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoCupsLuzEditar" type = "text" value = "${dato['cups_luz']}">
                        </div>
                    </div>

                    <div class="campo cups-gas">
                        <div class="texto">
                            <p>CUPS GAS:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoCupsGasEditar" type = "text" value = "${dato['cups_gas']}">
                        </div>
                    </div>

                    <div class="campo iban">
                        <div class="texto">
                            <p>IBAN:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoIbanEditar" type = "text" value = "${dato['iban']}">
                        </div>
                    </div>

                    <div class="campo numero-contrato">
                        <div class="texto">
                            <p>Numero de Contrato:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoNumeroContratoEditar" type = "text" value = "${dato['numero_contrato']}">
                        </div>
                    </div>

                    <div class="campo potencia">
                        <div class="texto">
                            <p>POTENCIA:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoPotenciaEditar" type = "text" value = "${dato['potencia']}">
                            <p></p>
                        </div>
                    </div>

                    <div class="campo peajeGas">
                        <div class="texto">
                            <p>PEAJE GAS:</p>
                        </div>
                        <div class="entrada">
                            <input id = "campoPeajeGasEditar" type = "text" value = "${dato['peaje_gas']}">
                        </div>
                    </div>

                    <div class="campo descripcion-venta">
                        <div class="texto">
                            <p>Observaciones venta:</p>
                        </div>
                        <div class="entrada">
                            <textarea id="observacionesVenta" disabled>${dato['observaciones_venta']}</textarea>
                        </div>
                    </div>


                </div>

                <div class="contenido-editable">
                    <h3>Informacion editabe</h3>
                    <div class="campo llamada-calidad">
                        <div class="texto">
                            <p>Llamada calidad:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="llamadaCalidadComboBoxCampoEditar">
                                <option value="${dato['llamada_calidad']}">${dato['llamada_calidad']}</option>
                                <option value="corregida">Corregida</option>
                            
                                <option value="realizada">Realizada</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo calidad-enviada">
                        <div class="texto">
                            <p>Calidad enviada:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="calidadEnviadaComboBoxCampoEditar">
                                <option value="${dato['calidad_enviada']}">${dato['calidad_enviada']}</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo verificacion-calidad">
                        <div class="texto">
                            <p>Verificación calidad:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="verificacionComboBoxCampoEditar">
                                <option value="${dato['verificacion_calidad']}">${dato['verificacion_calidad']}</option>
                                <option value="cumple calidad">Cumple calidad</option>
                                <option value="no cumple calidad">No cumple calidad</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo audios-cargados">
                        <div class="texto">
                            <p>Audios cargados:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="audiosCargadosComboBoxCampoEditar">
                                <option value="${dato['audios_cargados']}">${dato['audios_cargados']}</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo descripcion">
                        <div class="texto">
                            <p>Observaciones calidad:</p>
                        </div>
                        <div class="entrada">
                            <textarea id="observacionesCalidadCampoEditar">${dato['observaciones_calidad']}</textarea>
                        </div>
                    </div>

                    
                    <div class="campo legalizacion">
                        <div class="texto">
                            <p>Legalización:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="legalizacion">
                                <option value="${dato['legalizacion']}">${dato['legalizacion']}</option>
                                <option value="Naturgy">Naturgy</option>
                                <option value="Iberdrola">Iberdrola</option>
                                <option value="no aplica">No aplica</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo estado">
                        <div class="texto">
                            <p>Estado:</p>
                        </div>
                        <div class="entrada">
                            <select name="" id="estadoComboBoxCampoEditar">
                            <option value="${dato['estado']}">${dato['estado']}</option>
                            <option value="activa">Activa</option>
                            <option value="temporal">Temporal</option>
                            <option value="baja">Baja</option>
                            <option value="firmado">Firmado</option>
                            <option value="verificado">Verificado</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="desistimiento">Desistimiento</option>
                            <option value="devuelta">Devuelta</option>
                            </select>
                        </div>
                    </div>

                    <div class="campo descripcion">
                        <div class="texto">
                            <p>Observaciones adicionales:</p>
                        </div>
                        <div class="entrada">
                            <textarea id="observacionesAdicionalesCampoEditar">${dato['observaciones_adicionales']}</textarea>
                        </div>
                    </div>
                </div>

             </div>
    
            `
            
    return modalCabecera, modalCuerpo

        }
    },

    horaActual() {
        // Función para obtener la hora actual y actualizar el elemento correspondiente
        const currentTimeElement = document.getElementById('horaActual');
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
    
        let ampm = 'am';
    
        // Convertir a formato de 12 horas
        if (hours > 12) {
            hours -= 12;
            ampm = 'pm';
        }
    
        // Formato: HH:MM:SS
        const currentTimeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
        // Actualizar el contenido del elemento
        currentTimeElement.textContent = currentTimeString;
    },

    datosAgente(res) {

        const menuNombreAgente = document.getElementById('menuNombreAgente')
        const menuRolUsuario = document.getElementById('menuRolUsuario')

        const parrafoNombreAgente = document.createElement('p')
        const textoNombreAgente = document.createTextNode(res.data.nombre)

        parrafoNombreAgente.appendChild(textoNombreAgente)


        const parrafoRolAgente = document.createElement('p')
        const textoRolAgente = document.createTextNode(res.data.rol)

        parrafoRolAgente.appendChild(textoRolAgente)


        menuNombreAgente.appendChild(parrafoNombreAgente)
        menuRolUsuario.appendChild(parrafoRolAgente)

    },

    formatearFechaParaEnvio(fecha) {
        // Formatea la fecha en el formato deseado (dd/mm/yyyy)
        if (fecha.length == 0) {
            return fecha;
        } else {
            let meses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            var partes = fecha.split("-");

            if (partes[2].includes(meses)){
                var fechaFormateada = partes[2].replace("0", "") + "/" + partes[1] + "/" + partes[0];
            }else{
                var fechaFormateada = partes[2]+ "/" + partes[1] + "/" + partes[0];
            }

            return fechaFormateada;
        }
    },
    
    /*
    tomarEstadoGeneral(){
        const combobox  = document.getElementById('estadoVenta');
    
        combobox.addEventListener('change', () => {
            const estado  = combobox.value;
    
            ControladorGeneral.datosPorEstado(estado);

            if(estado === "todas"){
                ControladorGeneral.mostrarTodasLasVentas()
            }          
        })
        
    },
*/

    buscarPorIntervalo(){
        const fechaInicio = document.getElementById('start_date').value;
        const fechaFinal = document.getElementById('end_date').value;

        return {fechaInicio, fechaFinal}
    },

    filtrarTabla(){
        const columnaBuscarComboBox = document.getElementById('columnaBuscar');
        const textoBuscar  = document.getElementById('textoBuscar').value;
        
        columnaBuscarComboBox.addEventListener('change', () => {
            const estado  = columnaBuscarComboBox.value;
            const rol = localStorage.getItem('rol')
            console.log(rol)
            if(estado === "sin filtros"){
                this.recargarPagina(500)
                let textoBuscar  = document.getElementById('textoBuscar');
                textoBuscar.value = ""
            }          

        })

        const columnaBuscar =  columnaBuscarComboBox.value;
        return { columnaBuscar, textoBuscar }

    },

    mostrarMensajeError(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'Algo salió mal',
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

    recargarPagina(tiempo) {
        setTimeout(function () {
            window.location.reload()
        }, tiempo);
    },

    redirigirCalidad() {
        location.href = ("../pages/admin/calidad.html");
    },

    redirigirAIndex() {
        location.href = ("../home.html");
    },
}

export default General;

document.addEventListener('DOMContentLoaded', function () {
    ControladorGeneral.datosAgente()
    
    
})