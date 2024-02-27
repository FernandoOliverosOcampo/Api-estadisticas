import Controlador from "../controlador/controlador_leader.js";
import General from "../../general/general.js";

const Vista = {

  llenarCuadroVentasTotales(cant_venta_totales, titulo) {
    const datos = document.getElementById("contenedorDatos");
    const contenidoDatos = document.createElement("div");

    contenidoDatos.classList.add("estadistica");
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
    `;
    datos.append(contenidoDatos);
  },

  datosEstadisticos( cant_ventas_dia_actual, response_semana_actual, response_mes_actual) {
    const cant_ventas_semana_actual = response_semana_actual.data["cant_ventas_semana_actual"];
    const cant_ventas_mes_actual =
      response_mes_actual.data["cant_ventas_mes_actual"];

    this.llenarCuadroVentasTotales(cant_ventas_dia_actual, "Ventas dia actual");
    this.llenarCuadroVentasTotales(
      cant_ventas_semana_actual,
      "Ventas semana actual"
    );
    this.llenarCuadroVentasTotales(cant_ventas_mes_actual, "Ventas mes actual");
  },

  modalIncrustado(targetModal, btnAbrir, claseCerrarModal) {
    /* MODAL Agregar datos */
    var modal = document.getElementById(targetModal);
    var btnAbrirModal = document.getElementById(btnAbrir);
    var btnCerrarModal = document.getElementsByClassName(claseCerrarModal)[0];

    btnAbrirModal.onclick = function () {
      modal.style.display = "block";
    };

    btnCerrarModal.onclick = function () {
      modal.style.display = "none";
    };
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
    };
  },

  modalContenido(modalCuerpo, modalCabecera, dato) {

    modalCabecera.innerHTML = `
         <h1>Información</h1>
            `;
    modalCuerpo.innerHTML = `
        <div class="informacion-agente-venta">
            <h3>Informacion agente</h3>
                    
            <div class="informacion-agente">
                <p>Id venta:</p>
                <p id = "idVenta" ><i class="fa-solid fa-hashtag"></i> ${dato["id"]}</p>
                <p><i class="fa-solid fa-calendar-days"></i> Fecha: ${dato["fecha_ingreso_venta"]}</p>
                <p><i class="fa-solid fa-people-group"></i> Lider Equipo: ${dato["lider_equipo"]}</p>
                <p id = "cedula" ><i class="fa-solid fa-address-card"> </i> Cedula:  ${dato["cedula"]}</p>
                <p><i class="fa-solid fa-user"></i> Agente: ${dato["nombre_agente"]}</p>
                <p><i class="fa-solid fa-database"></i> Base de datos: ${dato["base_de_datos"]}</p>                      
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
                <p>${dato["compania"]}</p>
            </div>
        </div>

        <div class="campo dni">
            <div class="texto">
                <p>DNI:</p>
            </div>
            <div class="entrada">
                <p>${dato["dni"]}</p>
            </div>
        </div>

        <div class="campo nombre">
            <div class="texto">
                <p>Nombre:</p>
            </div>
            <div class="entrada">
                <p>${dato["nombre"]}</p>
            </div>
        </div>

        <div class="campo telefono">
            <div class="texto">
                <p>Telefono:</p>
            </div>
            <div class="entrada">
                <p>${dato["telefono"]}</p>
            </div>
        </div>

        <div class="campo correo">
            <div class="texto">
                <p>Correo:</p>
            </div>
            <div class="entrada">
                <p>${dato["correo"]}</p>
            </div>
        </div>

        <div class="campo direccion">
            <div class="texto">
                <p>Dirección:</p>
            </div>
            <div class="entrada">
                <p>${dato["direccion"]}</p>
            </div>
        </div>

        <div class="campo fecha-nacimiento">
            <div class="texto">
                <p>Fecha de nacimiento:</p>
            </div>
            <div class="entrada">
                <p>${dato["fecha_nacimiento"]}</p>
            </div>
        </div>

        <div class="campo cups-luz">
            <div class="texto">
                <p>CUPS LUZ:</p>
            </div>
            <div class="entrada">
                <p>${dato["cups_luz"]}</p>
            </div>
        </div>

        <div class="campo cups-gas">
            <div class="texto">
                <p>CUPS GAS:</p>
            </div>
            <div class="entrada">
                <p>${dato["cups_gas"]}</p>
            </div>
        </div>

        <div class="campo iban">
            <div class="texto">
                <p>IBAN:</p>
            </div>
            <div class="entrada">
                <p>${dato["iban"]}</p>
            </div>
        </div>

        <div class="campo numero-contrato">
            <div class="texto">
                <p>Numero de Contrato:</p>
            </div>
            <div class="entrada">
                <p>${dato["numero_contrato"]}</p>
            </div>
        </div>

        <div class="campo potencia">
            <div class="texto">
                <p>POTENCIA:</p>
            </div>
            <div class="entrada">
                <p>${dato["potencia"]}</p>
            </div>
        </div>

        <div class="campo peajeGas">
            <div class="texto">
                <p>PEAJE GAS:</p>
            </div>
            <div class="entrada">
                <p>${dato["peaje_gas"]}</p>
            </div>
        </div>

        <div class="campo descripcion-venta">
            <div class="texto">
                <p>Observaciones venta:</p>
            </div>
            <div class="entrada">
                <textarea id="observacionesVenta" disabled>${dato["observaciones_venta"]}</textarea>
            </div>
        </div>
    </div>

    <div class="contenido-editable">
        <div class="campo llamada-calidad">
            <div class="texto">
                <p>Llamada calidad:</p>
            </div>
            <div class="entrada">
                <p>${dato["llamada_calidad"]}</p>
            </div>
        </div>

        <div class="campo calidad-enviada">
            <div class="texto">
                <p>Calidad enviada:</p>
            </div>
            <div class="entrada">
                <p>${dato["calidad_enviada"]}</p>
            </div>
        </div>

        <div class="campo verificacion-calidad">
            <div class="texto">
                <p>Verificación calidad:</p>
            </div>
            <div class="entrada">
                <p>${dato["verificacion_calidad"]}</p>
            </div>
        </div>

        <div class="campo audios-cargados">
            <div class="texto">
                <p>Audios cargados:</p>
            </div>
            <div class="entrada">
                <p>${dato["audios_cargados"]}</p>
            </div>
        </div>

        
        <div class="campo legalizacion">
            <div class="texto">
                <p>Legalización:</p>
            </div>
            <div class="entrada">
                <p>${dato["legalizacion"]}</p>
            </div>
        </div>

        <div class="campo estado">
            <div class="texto">
                <p>Estado:</p>
            </div>
            <div class="entrada">
                <select name="" id="estadoComboBoxCampoEditar">
                    <option value="${dato["estado"]}">${dato["estado"]}</option>
                    <option value="recuperada">Recuperada</option>
                    <option value="no recuperable">No recuperable</option>
                </select>
            </div>
        </div>

        <div class="campo descripcion">
            <div class="texto">
                <p>Observaciones calidad:</p>
            </div>
            <div class="entrada">
                <textarea disabled>${dato["observaciones_calidad"]}</textarea>
            </div>
        </div>

        <div class="campo descripcion">
            <div class="texto">
                <p>Observaciones adicionales:</p>
            </div>
            <div class="entrada">
                <textarea disabled>${dato["observaciones_adicionales"]}</textarea>
            </div>
        </div>

    </div>

    </div>
        
            `;
    return modalCabecera, modalCuerpo;
  },

  mostrarTablaDatos(response) {
    const datos = response.data["ventas_realizadas"];
    const tablaDatos = document.getElementById("tablaDatos");

    tablaDatos.innerHTML = "";

    // Definir las columnas que deseas mostrar
    const columnasAMostrar = [
      "fecha_ingreso_venta",
      "nombre_agente",
      "compania",
      "dni",
      "nombre",
      "estado",
    ];

    // Crear encabezado
    const encabezadoRow = document.createElement("tr");
    for (const columna of columnasAMostrar) {
      const th = document.createElement("th");
      th.textContent = columna;
      encabezadoRow.appendChild(th);
    }
    tablaDatos.appendChild(encabezadoRow);

    // Crear filas de datos
    datos.forEach((dato) => {
      const fila = document.createElement("tr");
      for (const columna of columnasAMostrar) {
        const celda = document.createElement("td");
        celda.textContent = dato[columna];

        // Agregar la clase "estado-verde" a la celda específica
        if (
          columna === "verificacion_calidad" &&
          dato[columna] === "cumple calidad"
        ) {
          celda.classList.add("letras-estado-verde");
        }

        // Agregar la clase "estado-verde" a la celda específica
        if (
          columna === "verificacion_calidad" &&
          dato[columna] === "no cumple calidad"
        ) {
          celda.classList.add("letras-estado-rojo");
        }

        if (
          columna === "verificacion_calidad" &&
          dato[columna] === "pendiente"
        ) {
          celda.classList.add("letras-estado-amarillo");
        }

        // Agregar la clase "estado-verde" al select si el estado es "activo"

        if (columna === "estado" && dato[columna] === "recuperada") {
          celda.classList.add("letras-estado-azul");
        }

        if (
          (columna === "estado" && dato[columna] === "activa") ||
          (columna === "estado" && dato[columna] === "firmado")
        ) {
          celda.classList.add("letras-estado-verde");
        }

        if (columna === "estado" && dato[columna] === "pendiente") {
          celda.classList.add("letras-estado-amarillo");
        }

        if (
          (columna === "estado" && dato[columna] === "baja") ||
          (columna === "estado" && dato[columna] === "devuelta") ||
          (columna === "estado" && dato[columna] === "cancelada")
        ) {
          celda.classList.add("letras-estado-rojo");
        }

        fila.appendChild(celda);
      }
      // Agregar botones de editar, eliminar y ver a cada fila
      for (let i = 0; i < 1; i++) {
        const celda = document.createElement("td");
        const boton = document.createElement("button");
        const icono = document.createElement("i");

        // Agregar la clase especial 'no-padding' a las celdas de los botones
        celda.classList.add("no-padding");

        if (i === 0) {
          // Configuración para el botón de editar
          icono.classList.add("fa-solid", "fa-eye");
          icono.setAttribute("id", "abrirModalInformacionDatos");
          boton.addEventListener("click", () => {
            Vista.modalCero(
              "targetModalInformacionDatos",
              "cerrar-modal-informacion-datos"
            );
            const modalCuerpo = document.getElementById("modalCuerpo");
            const modalCabecera = document.getElementById("modalCabecera");
            Vista.modalContenido(modalCuerpo, modalCabecera, dato);
          });
        }

        boton.appendChild(icono);
        celda.appendChild(boton);
        fila.appendChild(celda);
      }

      tablaDatos.appendChild(fila);
    });
  },

  llenarCuadroVentasTotales(cant_venta_totales, titulo) {
    const datos = document.getElementById("contenedorDatos");
    const contenidoDatos = document.createElement("div");

    contenidoDatos.classList.add("estadistica");
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
        `;
    datos.append(contenidoDatos);
  },

  datosEstadisticos(res) {
    const cant_ventas_totales_realizadas = res.data.cant_ventas_realizadas;
    const cant_ventas_totales_diciembre = res.data.cant_ventas_diciembre;
    const cant_ventas_totales_enero = res.data.cant_ventas_enero;
    const cant_ventas_totales_febrero = res.data.cant_ventas_febrero;
    const prom_venta_semana_actual = res.data.prom_venta_semana_actual;
    const prom_venta_mes_actual = res.data.prom_venta_mes_actual;

    this.llenarCuadroVentasTotales(
      cant_ventas_totales_realizadas,
      "Ventas Totales"
    );
    this.llenarCuadroVentasTotales(
      prom_venta_semana_actual,
      "Promedio semana actual"
    );
    this.llenarCuadroVentasTotales(prom_venta_mes_actual, "Promedio mensual");
    this.llenarCuadroVentasTotales(
      cant_ventas_totales_diciembre,
      "Ventas Diciembre"
    );
    this.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero");
    this.llenarCuadroVentasTotales(
      cant_ventas_totales_febrero,
      "Ventas Febrero"
    );
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
                                <button><a href= "../../home.html">Inicio</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "../perfil.html">Mi perfil</a></button>
                            </div>
                        </div>

                        <div class="enlace">
                            <div class="icono">
                                <i class="fa-solid fa-user"></i>
                            </div>
                    
                            <div class="texto">
                                <button><a href= "./inicio_team_leader.html">Mi equipo</a></button>
                            </div>
                        </div>

                        
                        <div class="enlace">
                        <div class="icono">
                            <i class="fa-solid fa-user"></i>
                        </div>
            
                        <div class="texto">
                            <button><a href= "../formulario_ventas.html">Añadir Venta</a></button>
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
        location.href = "../login.html";
      };
    } else {
      location.href = "../login.html";
    }
  },

  crearGrafico(myChart, labels_barra, datos_barra, tipo) {
    new Chart(myChart, {
      type: tipo,
      data: {
        labels: labels_barra,
        datasets: [
          {
            label: "# de ventas",
            data: datos_barra,
            borderWidth: 1,
            backgroundColor: [
              "rgba(93, 23, 235, 0.2)", // Morado oscuro
              "rgba(0, 100, 0, 0.2)", // Verde oscuro
              "rgba(255, 80, 234, 0.2)",
            ],
          },
        ],
      },
    });
  },

  mostrarGraficas(res) {
    const myChart = document.getElementById("myChart");
    const dona = document.getElementById("myDona");

    const mesActual = parseInt(res.data.cant_ventas_enero);

    const datos_barra = [
      res.data.cant_ventas_noviembre,
      res.data.cant_ventas_diciembre,
      mesActual,
    ];
    const labels_barra = ["Noviembre", "Diciembre", "Enero"];
    this.crearGrafico(myChart, labels_barra, datos_barra, "bar");

    const datos_dona = [mesActual, 23 - mesActual];
    const labels_dona = ["Ventas realizadas", "Ventas por cumplir"];
    this.crearGrafico(dona, labels_dona, datos_dona, "doughnut");

    const tituloGrafica = document.getElementById("tituloGrafica");
    tituloGrafica.innerHTML = `
        <p>Ventas mes actual =  ${mesActual}/23</p>
        `;
  },

  comboboxBuscarAgente(res2) {
    const datos = res2.data["agentes_pertenecientes"];

    const buscarAgente = document.getElementById("buscarAgente");
    const selectBuscar = document.createElement("select");
    selectBuscar.setAttribute("id", "cedulaAgenteBuscar");

    const optionDefault = document.createElement("option");
    optionDefault.value = "no seleccionado";
    optionDefault.text = "sin seleccionar";
    optionDefault.selected = true;
    selectBuscar.appendChild(optionDefault);

    datos.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.cedula;
        option.text = element.nombre;
        selectBuscar.appendChild(option);
        
    });
    buscarAgente.appendChild(selectBuscar);

},


  traerCedulaAgente() {
    
    const combobox = document.getElementById("cedulaAgenteBuscar").value;

    console.log(combobox)
    
    // combobox.addEventListener("change", () => {
    //   const cedulaAgente = combobox.value;
    //   Controlador.buscarDatosPersonalesAgente(cedulaAgente);
    // });

    return { combobox }
    
  },

  llenarDatosPersonalesAgente(res) {
    const data = res.data;
    const contenedorDatosAgente = document.getElementById(
      "contenedorDatosAgente"
    );
    contenedorDatosAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Cédula:</p>
            </div>
            <div class="texto" id="cedulaAgente">
            <p>${data.cedula}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Nombre:</p>
            </div>
            <div class="texto" id="nombreAgente">
            <p>${data.nombre}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Correo:</p>
            </div>
            <div class="texto" id="correoAgente">
            <p>${data.correo}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Celular:</p>
            </div>
            <div class="texto" id="celularAgente">
            <p>${data.celular}</p>

            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Campaña:</p>
            </div>
            <div class="texto" id="campañaAgente">
            <p>${data.campana}</p>

            </div>
        </div>

        `;
  },

  llenarEstadisticasAgente(res) {
    const data = res.data;

    console.log(data);

    const cant_ventas_mes_actual = data.cant_ventas_mes_actual;
    const cant_ventas_semana_actual = data.cant_ventas_semana_actual;
    const prom_venta_mes_actual = data.prom_venta_mes_actual;
    const prom_venta_semana_actual = data.prom_venta_semana_actual;
    const prom_ventas_diarias = data.prom_ventas_diarias;
    const porcCumplirMeta = data.porcCumplirMeta;
    const cant_ventas_restantes = data.cant_ventas_restantes;
    const ventas_activas = data.ventas_activas;
    const ventas_temporales = data.ventas_temporal;
    const ventas_bajas = data.ventas_baja;
    const ventas_firmadas = data.ventas_firmado;
    const ventas_verificadas = data.ventas_verificado;
    const ventas_canceladas = data.ventas_cancelada;
    const ventas_desistimientos = data.ventas_desistimiento;
    const ventas_devueltas = data.ventas_devuelta;
    const ventas_recuperadas = data.ventas_recuperada;

    const contenedorEstadisticasAgente = document.getElementById(
      "contenedorEstadisticasAgente"
    );
    const contenedorEstadoVentasAgente = document.getElementById(
      "contenedorEstadoVentasAgente"
    );

    contenedorEstadisticasAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Ventas mes actual:</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_mes_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Ventas semana actual:</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_semana_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas mes actual:</p>
            </div>
            <div class="texto">
                <p>${prom_venta_mes_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas semana actual:</p>
            </div>
            <div class="texto">
                <p>${prom_venta_semana_actual}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Promedio ventas diarias:</p>
            </div>
            <div class="texto">
                <p>${prom_ventas_diarias}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Ventas restantes (para meta):</p>
            </div>
            <div class="texto">
                <p>${cant_ventas_restantes}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Porcentaje para cumplir meta:</p>
            </div>
            <div class="texto">
                <p>${porcCumplirMeta}%</p>
            </div>
        </div>
        `;

    contenedorEstadoVentasAgente.innerHTML = `
        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas activas:</p>
            </div>
            <div class="texto">
                <p>${ventas_activas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas temporales:</p>
            </div>
            <div class="texto">
                <p>${ventas_temporales.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas bajas:</p>
            </div>
            <div class="texto">
                <p>${ventas_bajas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas firmadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_firmadas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas verificadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_verificadas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas canceladas:</p>
            </div>
            <div class="texto">
                <p>${ventas_canceladas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas desistimientos:</p>
            </div>
            <div class="texto">
                <p>${ventas_desistimientos.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas devueltas:</p>
            </div>
            <div class="texto">
                <p>${ventas_devueltas.length}</p>
            </div>
        </div>

        <div class="campo">
            <div class="titulo">
                <p>Cantidad de ventas recuperadas:</p>
            </div>
            <div class="texto">
                <p>${ventas_recuperadas.length}</p>
            </div>
        </div>
        `;
  },

  agentesPertenecientes(res) {
    const dataAgentes = res.data["agentes_pertenecientes"];
    const agentesPertenecientesContenedor = document.getElementById(
      "agentesPertenecientesContenedor"
    );
    const listaAgentesPertenecientes = document.getElementById(
      "listaAgentesPertenecientes"
    );

    // Limpiar la lista antes de agregar nuevos elementos
    listaAgentesPertenecientes.innerHTML = "";

    dataAgentes.forEach((element) => {
      const listItem = document.createElement("div");
      listItem.innerHTML = `
                <p>Cedula: ${element.cedula}</p>
                <p>Nombre: ${element.nombre}</p>
                <p>Cantidad de ventas mes actual: ${element.ventas_mes_actual}</p>

            `;
      listaAgentesPertenecientes.appendChild(listItem);
    });

    // Agregar la lista completa al contenedor
    agentesPertenecientesContenedor.appendChild(listaAgentesPertenecientes);
  },

  redirigirAIndex() {
    location.href = "../../home.html";
  },

  editarEstadoVenta() {
    const id_venta = document.getElementById("idVenta").textContent;
    const estado = document.getElementById("estadoComboBoxCampoEditar").value;

    return {
      id_venta,
      estado,
    };
  },

  mostrarMensajeError(mensaje) {
    Swal.fire({
      icon: "error",
      title: "Algo salió mal",
      text: mensaje,
    });
  },

  mostrarAlertaSatisfactorio(mensaje) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500,
    });
  },

  recargarPagina(tiempo) {
    setTimeout(function () {
      window.location.reload();
    }, tiempo);
  },
};

export default Vista;

document.addEventListener("DOMContentLoaded", function () {
  const rol = localStorage.getItem("rol");
  if (rol == "agente" || rol == "calidad") {
    Vista.redirigirAIndex();
  }

  Controlador.ventasRealizadasAgente();
  Controlador.datosAgenteGraficas();
  General.horaActual();
  
  setInterval(General.horaActual, 1000);
  
  Controlador.traerAgentesPertenecientes();
  Vista.opcionesMenu();
//   Vista.comboboxBuscarAgente()
});

const btnEnviarCedulaAgente = document.getElementById('btnEnviarCedulaAgente')

btnEnviarCedulaAgente.onclick = function () {
    Controlador.buscarDatosPersonalesAgente();
}

const abrirMenuOpciones = document.getElementById("abrirMenuOpciones");
const opcionesPerfil = document.getElementById("opcionesPerfil");

abrirMenuOpciones.onclick = function () {
  if (
    opcionesPerfil.style.display === "none" ||
    opcionesPerfil.style.display === ""
  ) {
    opcionesPerfil.style.display = "block";
  } else {
    opcionesPerfil.style.display = "none";
  }
};

botonEditar.onclick = function () {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "¿Estás seguro?",
      text: "Deseas actualizar esta información de la venta en la BD",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        Controlador.editarEstadoVenta();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "No se ha ingresado nada",
          "error"
        );
      }
    });
};
