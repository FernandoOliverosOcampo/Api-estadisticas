import Controlador from "../controlador/controlador_estadisticas.js"
import General from "../../general/general.js"
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

        this.llenarCuadroVentasTotales(cant_ventas_totales_realizadas, "Ventas Totales")
        this.llenarCuadroVentasTotales(cant_ventas_totales_diciembre, "Ventas Diciembre")
        this.llenarCuadroVentasTotales(cant_ventas_totales_enero, "Ventas Enero")
        this.llenarCuadroVentasTotales(cant_ventas_totales_febrero, "Ventas Febrero")

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
          <button><a href= "../pages/admin.html">Inicio</a></button>
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
            <i class="fa-solid fa-people-group"></i>
          </div>

          <div class="texto">
              <button><a href= "../pages/admin/equipo.html">Equipos</a></button>
          </div>
        </div>
        <div class="enlace">
        <div class="icono">
        <i class="fa-solid fa-certificate"></i>
        </div>

        <div class="texto">
            <button><a href= "../pages/admin/calidad.html">Calidad</a></button>
        </div>
      </div>

        <div class="enlace">
          <div class="icono">
            <i class="fa-solid fa-headset"></i>
          </div>

          <div class="texto">
              <button><a href= "../pages/formulario_ventas.html">Ventas</a></button>
          </div>
        </div>
        <div class="enlace">
        <div class="icono">
            <i class="fa-solid fa-user"></i>
        </div>

        <div class="texto">
          <button><a href= "../pages/registro_agentes.html">Registrar agente</a></button>
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

            const botonCerrarSesion = document.getElementById("cerrarSesion");
            botonCerrarSesion.onclick = function () {
                localStorage.clear();
                location.href = "../pages/login.html";
            };
        } else {
            location.href = "../pages/login.html";
        }
    },

    crearGrafico(myChart, labels_barra, datos_barra, tipo) {

        new Chart(myChart, {
            type: tipo,
            data: {
                labels: labels_barra,
                datasets: [{
                    label: '# de ventas',
                    data: datos_barra,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(93, 23, 235, 0.2)', // Morado oscuro
                        'rgba(0, 100, 0, 0.2)',   // Verde oscuro
                        'rgba(255, 80, 234, 0.2)',
                    ]
                },
                

            ]
            },

        });
    },

    mostrarGraficas(res) {

        const myChart = document.getElementById('myChart')
        const dona = document.getElementById('myDona')

        const mesActual = parseInt(res.data.cant_ventas_febrero)

        const datos_barra = [res.data.cant_ventas_noviembre, res.data.cant_ventas_diciembre, res.data.cant_ventas_enero, mesActual]
        const labels_barra = ['Noviembre', 'Diciembre', 'Enero', 'Febrero']
        this.crearGrafico(myChart, labels_barra, datos_barra, 'bar')

        const datos_dona = [mesActual, 23 - mesActual]
        const labels_dona = ['Ventas realizadas', 'Ventas por cumplir']
        this.crearGrafico(dona, labels_dona, datos_dona, 'doughnut')

        const tituloGrafica = document.getElementById('tituloGrafica')
        tituloGrafica.innerHTML =
            `
        <p>Ventas mes actual =  ${mesActual}/23</p>
        `;
    }, 
    
    llenarPromedios(res){

        //promedios
        const ventasSemanaActual = res.data.cant_ventas_semana_actual
        const promedioMesActual = res.data.prom_venta_mes_actual
        const promedioSemanaActual = res.data.prom_venta_semana_actual
        const vistaPromedioSemanal = document.getElementById('promedioSemanal');
        const vistaPromedioMensual = document.getElementById("promedioMensual");
        const vistaVentaSemanal = document.getElementById("ventaSemanal");
        vistaPromedioSemanal.innerHTML = `
        <div class="icono">
           <p> <i class="fa-solid fa-percent"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Promedio ventas semanal</p>
        </div>
        <div class="numero_promedio">
            <p>${promedioSemanaActual} </i></p>
        </div>
    `;

    vistaPromedioMensual.innerHTML = `
        <div class="icono">
            <p> <i class="fa-solid fa-percent"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Promedio ventas mensual</p>
        </div>
        <div class="numero_promedio">
            <p>${promedioMesActual}</i></p>
        </div>
    `;

    vistaVentaSemanal.innerHTML = `
        <div class="icono">
            <p> <i class="fa-solid fa-calendar-days"></i></p>
        </div>
        <div class="titulo_promedio">
            <p>Cantidad ventas semanal</p>
        </div>
        <div class="numero_promedio">
            <p>${ventasSemanaActual}</p>
        </div>
    `;


        //ventas
        const cantVentasActivas = res.data.ventas_activas.length
        const cantVentasTemporal = res.data.ventas_temporal.length
        const cantVentasBaja = res.data.ventas_baja.length
        const cantVentasFirmado = res.data.ventas_firmado.length
        const cantVentasVerificado = res.data.ventas_verificado.length
        const cantVentasCancelada = res.data.ventas_cancelada.length
        const cantVentasDesistimiento= res.data.ventas_desistimiento.length
        const cantVentasPendiente = res.data.ventas_pendiente.length

        const cantVentasDevuelta = res.data.ventas_devuelta.length
        const ventas = document.getElementById('ventas')
        
        ventas.innerHTML = `
        <div class="ventas_estado" id="ventasActivas">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas activas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasActivas}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasBajas">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas temporales</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasTemporal}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas bajas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasBaja}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas pendientes</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasPendiente}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasPendiente">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas canceladas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasCancelada}</i></p>
            </div>
        </div>

        <div class="ventas_estado" id="ventasNoSeleccionada">
            <div class="icono">
                <p><i class="fa-solid fa-check"></i></p>
            </div>
            <div class="titulo_promedio">
                <p>Ventas devueltas</p>
            </div>
            <div class="numero_promedio">
                <p>${cantVentasDevuelta}</i></p>
            </div>
        </div>

        `;

    },

    obtenerDatosSegunSeleccion(resAgente, seleccion) {
        switch (seleccion) {
            case 'activa':
                return resAgente.data.ventas_activas;
            case 'devuelta':
                return resAgente.data.ventas_devuelta;
            case 'cancelada':
                return resAgente.data.ventas_cancelada;
            case 'firmada':
                return resAgente.data.ventas_firmado;
            case 'pendiente':
                return resAgente.data.ventas_pendiente;
            case 'recuperada':
                return resAgente.data.ventas_recuperada;
            case 'temporal':
                return resAgente.data.ventas_temporal;
            case 'verificada':
                return resAgente.data.ventas_verificado;
            case 'bajas':
                return resAgente.data.ventas_baja;
            case 'desistimiento':
                return resAgente.data.ventas_desistimiento;
            default:
                return [];
                

                
        }
    },

    crearFilaDeDatos(dato) {
        const columnasAMostrar = ['fecha_ingreso_venta', 'dni', 'nombre', 'observaciones_venta', 'verificacion_calidad', 'observaciones_calidad', 'observaciones_adicionales', 'estado'];
        const fila = document.createElement('tr');
        columnasAMostrar.forEach(columna => {
            const celda = document.createElement('td');
            celda.textContent = dato[columna];
            this.aplicarEstilos(celda, columna, dato[columna]);
            fila.appendChild(celda);
        });
        return fila;
    },

    aplicarEstilos(celda, columna, valor) {
        
        const estilos = {
            'verificacion_calidad': {
                'cumple calidad': 'letras-estado-verde',
                'no cumple calidad': 'letras-estado-rojo',
                'pendiente': 'letras-estado-amarillo'
            },

            'estado': {
                'activa': 'letras-estado-verde',
                'firmado': 'letras-estado-verde',
                'recuperada': 'letras-estado-azul',
                'temporal': 'letras-estado-azul',
                'verificada': 'letras-estado-azul',
                'devuelta': 'letras-estado-rojo',
                'cancelada': 'letras-estado-rojo',
                'desistimiento': 'letras-estado-rojo',
                'baja': 'letras-estado-rojo',
                'pendiente': 'letras-estado-amarillo',

            }
        };
        if (estilos[columna] && estilos[columna][valor]) {
            celda.classList.add(estilos[columna][valor]);
        }
    },

    mostrarTodasLasVentas(resAgente) {
        const combobox = document.getElementById('estadoVenta');
        combobox.addEventListener('change', ()=>{
            const seleccion = combobox.value;

            const datos = this.obtenerDatosSegunSeleccion(resAgente, seleccion)          

            const tablaDatos = document.getElementById('tablaDatos');  
            tablaDatos.innerHTML = ''; 
            
           // Definir las columnas que deseas mostrar
            const columnasAMostrar = ['fecha_ingreso_venta', 'dni', 'nombre', 'observaciones_venta', 'verificacion_calidad' , 'observaciones_calidad', 'observaciones_adicionales', 'estado'];
            
            // Crear encabezado
            const encabezadoRow = document.createElement('tr');
              for (const columna of columnasAMostrar) {
                  
                  const th = document.createElement('th');
                  th.textContent = columna;
                  encabezadoRow.appendChild(th);
              }
             
             tablaDatos.appendChild(encabezadoRow)
             datos.forEach(dato => {
                const fila = this.crearFilaDeDatos(dato)
                tablaDatos.appendChild(fila)

             })
          
        })
       
    },

}
export default Vista;

document.addEventListener('DOMContentLoaded', function () {
    Controlador.ventasRealizadasAgente();
    Controlador.datosAgenteGraficas();
    Controlador.mostrarEstadisticas();
    Controlador.mostrarEstadoVentasTabla()
    
    Vista.opcionesMenu();
    General.horaActual();
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