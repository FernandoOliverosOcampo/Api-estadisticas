import Controlador from "../controlador/controlador_home.js"
import General from "../../general/general.js"
import swalAlert from "../../otros/alertas.js"

const Vista = {

    llenarCuadroVentasTotales(cant_venta_totales, titulo) {
        const datos = document.getElementById("contenedorDatos")
        const contenidoDatos = document.createElement('div')

        contenidoDatos.classList.add("estadistica")
        contenidoDatos.innerHTML = `
            <div class="titulo">
                <p>${titulo}</p>
            </div>
             
            <div class="valor">
               <p>${cant_venta_totales}</p>
            </div>
    
            <div class="icono">
               <i class="fa-solid fa-money-check-dollar"></i>
            </div>
        `
        datos.append(contenidoDatos)
    },

    datosEstadisticos(res) {

        const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas
        const cant_ventas_totales_diciembre = res.data.cant_ventas_diciembre
        const cant_ventas_totales_enero = res.data.cant_ventas_enero
        const cant_ventas_totales_febrero = res.data.cant_ventas_febrero


        this.llenarCuadroVentasTotales(cant_ventas_totales_diciembre, "Ventas Diciembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
        this.llenarCuadroVentasTotales(cant_ventas_totales_febrero, "Ventas Febrero")

    },

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
        /*
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        */
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
            <p id="idVenta"><i class="fa-solid fa-hashtag"></i> ${dato['id']}</p>
            <p><i class="fa-solid fa-calendar-days"></i> Fecha: ${dato['fecha_ingreso_venta']}</p>
            <p><i class="fa-solid fa-people-group"></i> Lider Equipo: ${dato['lider_equipo']}</p>
            <p id="cedula"><i class="fa-solid fa-address-card"> </i> Cedula: ${dato['cedula']}</p>
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
                        <p id="campoCompañiaEditar">${dato['compania']}</p>
                    </div>
                </div>

                <div class="campo dni">
                    <div class="texto">
                        <p>DNI:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoDniEditar">${dato['dni']}</p>
                    </div>
                </div>

                <div class="campo nombre">
                    <div class="texto">
                        <p>Nombre:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoNombreEditar">${dato['nombre']}</p>
                    </div>
                </div>

                <div class="campo telefono">
                    <div class="texto">
                        <p>Telefono:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoTelefonoEditar">${dato['telefono']}</p>
                    </div>
                </div>

                <div class="campo correo">
                    <div class="texto">
                        <p>Correo:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoCorreoEditar">${dato['correo']}</p>
                    </div>
                </div>

                <div class="campo direccion">
                    <div class="texto">
                        <p>Dirección:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoDireccionEditar">${dato['direccion']}</p>
                    </div>
                </div>

                <div class="campo fecha-nacimiento">
                    <div class="texto">
                        <p>Fecha de nacimiento:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoFechaNacimientoEditar">${dato['fecha_nacimiento']}</p>
                    </div>
                </div>


                <div class="campo cups-luz">
                    <div class="texto">
                        <p>CUPS LUZ:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoCupsLuzEditar">${dato['cups_luz']}</p>
                    </div>
                </div>

                <div class="campo cups-gas">
                    <div class="texto">
                        <p>CUPS GAS:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoCupsGasEditar">${dato['cups_gas']}</p>
                    </div>
                </div>

                <div class="campo iban">
                    <div class="texto">
                        <p>IBAN:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoIbanEditar">${dato['iban']}</p>
                    </div>
                </div>

                <div class="campo numero-contrato">
                    <div class="texto">
                        <p>Numero de Contrato:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoNumeroContratoEditar">${dato['numero_contrato']}</p>
                    </div>
                </div>

                <div class="campo potencia">
                    <div class="texto">
                        <p>POTENCIA:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoPotenciaEditar">${dato['potencia']}</p>
                    </div>
                </div>

                <div class="campo peajeGas">
                    <div class="texto">
                        <p>PEAJE GAS:</p>
                    </div>
                    <div class="entrada">
                        <p id="campoPeajeGasEditar">${dato['peaje_gas']}</p>
                    </div>
                </div>

                <div class="campo descripcion-venta">
                    <div class="texto">
                        <p>Observaciones venta:</p>
                    </div>
                    <div class="entrada">
                        <p id="observacionesVenta">${dato['observaciones_venta']}</p>
                    </div>
                </div>
                

        </div>

        <div class="contenido-editable">
            <div class="campo llamada-calidad">
                <div class="texto">
                    <p>Llamada calidad:</p>
                </div>
                <div class="entrada">
                    <p id="llamadaCalidadComboBoxCampoEditar">${dato['llamada_calidad']}</p>
                </div>
            </div>

            <div class="campo calidad-enviada">
                <div class="texto">
                    <p>Calidad enviada:</p>
                </div>
                <div class="entrada">
                    <p id="calidadEnviadaComboBoxCampoEditar">${dato['calidad_enviada']}</p>
                </div>
            </div>

            <div class="campo legalizacion">
                <div class="texto">
                    <p>Legalización:</p>
                </div>
                <div class="entrada">
                    <p id="legalizacion">${dato['legalizacion']}</p>
                </div>
            </div>

            <div class="campo verificacion-calidad">
                <div class="texto">
                    <p>Verificación calidad:</p>
                </div>
                <div class="entrada">
                    <p id="verificacionComboBoxCampoEditar">${dato['verificacion_calidad']}</p>
                </div>
            </div>

            <div class="campo audios-cargados">
                <div class="texto">
                    <p>Audios cargados:</p>
                </div>
                <div class="entrada">
                    <p id="audiosCargadosComboBoxCampoEditar">${dato['audios_cargados']}</p>
                </div>
            </div>

            <div class="campo estado">
                <div class="texto">
                    <p>Estado:</p>
                </div>
                <div class="entrada">
                    <select name="" id="estadoComboBoxCampoEditar">
                        <option value="${dato['estado']}">${dato['estado']}</option>
                        <option value="recuperada">Recuperada</option>
                    </select>
                </div>
            </div>

            <div class="campo descripcion">
                <div class="texto">
                    <p>Observaciones calidad:</p>
                </div>
                <div class="entrada">
                    <p id="observacionesCalidadCampoEditar">${dato['observaciones_calidad']}</p>
                </div>
            </div>

            <div class="campo descripcion">
                <div class="texto">
                    <p>Observaciones adicionales:</p>
                </div>
                <div class="entrada">
                    <p id="observacionesAdicionalesCampoEditar">${dato['observaciones_adicionales']}</p>
                </div>
            </div>

        </div>
        
    </div>
        
        `
        return modalCabecera, modalCuerpo
    },

    mostrarTablaDatos(response) {

        const datos = response.data['ventas_realizadas'];
        const tablaDatos = document.getElementById('tablaDatos');

        tablaDatos.innerHTML = '';

        // Definir las columnas que deseas mostrar
        const columnasAMostrar = ['fecha_ingreso_venta', 'estado', 'numero_contrato', 'dni', 'nombre', 'observaciones_venta', 'verificacion_calidad', 'observaciones_calidad', 'observaciones_adicionales'];

        // Crear encabezado
        const encabezadoRow = document.createElement('tr');
        for (const columna of columnasAMostrar) {
            const th = document.createElement('th');
            th.textContent = columna;
            encabezadoRow.appendChild(th);
        }
        tablaDatos.appendChild(encabezadoRow);

        // Crear filas de datos
        datos.forEach(dato => {
            const fila = document.createElement('tr');
            for (const columna of columnasAMostrar) {
                const celda = document.createElement('td');
                celda.textContent = dato[columna];

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'verificacion_calidad' && dato[columna] === 'cumple calidad') {
                    celda.classList.add('letras-estado-verde');
                }

                // Agregar la clase "estado-verde" a la celda específica
                if (columna === 'verificacion_calidad' && dato[columna] === 'no cumple calidad') {
                    celda.classList.add('letras-estado-rojo');
                }

                if (columna === 'verificacion_calidad' && dato[columna] === 'pendiente') {
                    celda.classList.add('letras-estado-amarillo');
                }

                // Agregar la clase "estado-verde" al select si el estado es "activo"

                if (columna === 'estado' && dato[columna] === 'recuperada') {
                    celda.classList.add('letras-estado-azul');
                }


                if (columna === 'estado' && dato[columna] === 'activa' || columna === 'estado' && dato[columna] === 'firmado') {
                    celda.classList.add('letras-estado-verde');
                }

                if (columna === 'estado' && dato[columna] === 'pendiente') {
                    celda.classList.add('letras-estado-amarillo');
                }

                if (columna === 'estado' && dato[columna] === 'baja' || columna === 'estado' && dato[columna] === 'devuelta' || columna === 'estado' && dato[columna] === 'cancelada') {
                    celda.classList.add('letras-estado-rojo');
                }



                fila.appendChild(celda);
            }
            // Agregar botones de editar, eliminar y ver a cada fila
            for (let i = 0; i < 3; i++) {
                const celda = document.createElement('td');
                const boton = document.createElement('button');
                const icono = document.createElement('i');

                // Agregar la clase especial 'no-padding' a las celdas de los botones
                celda.classList.add('no-padding');

                if (i === 0) {
                    // Configuración para el botón de editar
                    icono.classList.add('fa-solid', 'fa-pen-to-square');
                    icono.setAttribute('id', 'abrirModalInformacionDatos');
                    boton.addEventListener('click', () => {
                        Vista.modalCero("targetModalInformacionDatos", "cerrar-modal-informacion-datos")
                        const modalCuerpo = document.getElementById('modalCuerpo');
                        const modalCabecera = document.getElementById('modalCabecera');
                        Vista.modalContenido(modalCuerpo, modalCabecera, dato)
                    });
                }

                boton.appendChild(icono);
                celda.appendChild(boton);
                fila.appendChild(celda);
            }

            tablaDatos.appendChild(fila);
        });
    },

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
                                <button><a href= "./home.html">Inicio</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "./pages/perfil.html">Mi perfil</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "./pages/team_leader/inicio_team_leader.html">Mi equipo</a></button>
                            </div>
                        </div>

                        
                        <div class="enlace">
                        <div class="icono">
                            <i class="fa-solid fa-user"></i>
                        </div>
            
                        <div class="texto">
                            <button><a href= "./pages/formulario_ventas.html">Añadir Venta</a></button>
                        </div>
                    </div>
                        </div>
                    </div>
                
                    <div class="pie-menu">
                
                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-gear"></i>
                            </div>
                
                            <div class="texto">
                                <button>Configurar</button>
                            </div>
                        </div>
                
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
                    <button><a href= "./home.html">Inicio</a></button>
                </div>
            </div>

            <div class="enlace">
              <div class="icono">
                  <i class="fa-solid fa-user"></i>
              </div>
    
              <div class="texto">
                <button><a href= "./pages/perfil.html">Mi perfil</a></button>
              </div>
            </div>

            <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-user"></i>
            </div>
  
            <div class="texto">
                <button><a href= "./pages/formulario_ventas.html">Añadir Venta</a></button>
            </div>
          </div>
            </div>
        </div>
        <div class="enlace">
            <div class="icono">
            <i class="fa-solid fa-location-crosshairs"></i>
            </div>
  
            <div class="texto">
                <button><a href= "./pages/codigos_postales.html">Codigos postales</a></button>
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
          <button><a href= "../pages/admin.html">Inicio</a></button>
      </div>
  </div>
        <div class="enlace">
          <div class="icono">
              <i class="fa-solid fa-user"></i>
          </div>

          <div class="texto">
            <button><a href= "./pages/perfil.html">Mi perfil</a></button>
          </div>
        </div>

        <div class="enlace">
          <div class="icono">
            <i class="fa-solid fa-people-group"></i>
          </div>

          <div class="texto">
              <button><a href= "./pages/admin/equipo.html">Equipos</a></button>
          </div>
        </div>

        <div class="enlace">
          <div class="icono">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="texto">
              <button><a href= "./pages/formulario_ventas.html">Ventas</a></button>
          </div>
        </div>
        <div class="enlace">
        <div class="icono">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="texto">
          <button><a href= "./pages/registro_agentes.html">Registrar agente</a></button>
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
                location.href = "./pages/login.html";
            };
        } else {
            location.href = "./pages/login.html";
        }
    },

    editarVenta() {
        const id_venta = document.getElementById('idVenta').textContent;
        const cedula = document.getElementById('cedula').textContent;
        const compania = document.getElementById('campoCompañiaEditar').textContent;
        const nombre = document.getElementById('campoNombreEditar').textContent;
        const dni = document.getElementById('campoDniEditar').textContent;
        const telefono = document.getElementById('campoTelefonoEditar').textContent;
        const correo = document.getElementById('campoCorreoEditar').textContent;
        const direccion = document.getElementById('campoDireccionEditar').textContent;
        const fechaNacimiento = document.getElementById('campoFechaNacimientoEditar').textContent;
        const cupsLuz = document.getElementById('campoCupsLuzEditar').textContent;
        const cupsGas = document.getElementById('campoCupsGasEditar').textContent;
        const iban = document.getElementById('campoIbanEditar').textContent;
        const numeroContrato = document.getElementById('campoNumeroContratoEditar').textContent;
        const potencia = document.getElementById('campoPotenciaEditar').textContent;
        const peajeGas = document.getElementById('campoPeajeGasEditar').textContent;
        const llamada_calidad = document.getElementById('llamadaCalidadComboBoxCampoEditar').textContent;
        const calidad_enviada = document.getElementById('calidadEnviadaComboBoxCampoEditar').textContent;
        const verificacion_calidad = document.getElementById('verificacionComboBoxCampoEditar').textContent;
        const observaciones_calidad = document.getElementById('observacionesCalidadCampoEditar').textContent;
        const audios_cargados = document.getElementById('audiosCargadosComboBoxCampoEditar').textContent;
        const estado = document.getElementById('estadoComboBoxCampoEditar').value;
        const observaciones_adicionales = document.getElementById('observacionesAdicionalesCampoEditar').textContent;
        const legalizacion = document.getElementById('legalizacion').textContent;

        return {
            id_venta,
            cedula,
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
            numeroContrato,
            potencia,
            peajeGas,
            llamada_calidad,
            calidad_enviada,
            verificacion_calidad,
            observaciones_calidad,
            audios_cargados,
            estado,
            observaciones_adicionales,
            legalizacion
        };

    },
}

export default Vista;

document.addEventListener('DOMContentLoaded', function () {
    Controlador.ventasRealizadasAgente();
    Vista.opcionesMenu();
    General.horaActual()
    setInterval(General.horaActual, 1000);
})

const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
    if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
        opcionesPerfil.style.display = "block";
    } else {
        opcionesPerfil.style.display = "none";
    }
};

// Botón dentro del modal al seleccionar un registro que edita la info de una venta
const botonEditar = document.getElementById('botonEditar');
botonEditar.onclick = function () {
    swalAlert.confirmarAccion({
        texto: '¿Estás seguro de actualizar la venta?',
        funcionAlAceptar: Controlador.editarventa,
        mensajeAlCancelar: "No se ha editado nada"
    })
}
