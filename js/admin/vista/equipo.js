import Controlador from "../controlador/controlador_equipo.js";
import General from "../../general/general.js";
const Vista = {

    opcionesMenu() {
        if (localStorage.getItem("access_token")) {
            const contenidoPerfil = document.getElementById("contenidoPerfil");

            if (localStorage.getItem("rol") == "admin") {
                contenidoPerfil.innerHTML = `
        <div class="enlaces">
        <div class="enlace">
        <div class="icono">
            <i class="fa-solid fa-house"></i>
        </div>

        <div class="texto">
            <button><a href= "../admin.html">Inicio</a></button>
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
                <i class="fa-solid fa-people-group"></i>
            </div>

            <div class="texto">
                <button><a href= "./equipo.html">Equipos</a></button>
            </div>
            </div>

            <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-headset"></i>
            </div>

            <div class="texto">
                <button><a href= "../formulario_ventas.html">Ventas</a></button>
            </div>
            </div>
            <div class="enlace">
            <div class="icono">
                <i class="fa-solid fa-user"></i>
            </div>

            <div class="texto">
            <button><a href= "../registro_agentes.html">Registrar agente</a></button>
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
                location.href = "../login.html";
            };
        } else {
            location.href = "../login.html";
        }
    },

  obtenerNombre() {
    const combobox = document.getElementById('teamLeader');
    combobox.addEventListener('change', () => {
      const nombre = combobox.value;
      if (nombre === 'davina' || nombre === 'ray' || nombre === 'laureano' || nombre === 'miguel') {
        Controlador.ventasRealizadasAgente(nombre, (res) => {
          this.datosEstadisticos(res);
        });
        Controlador.traerAgentesPertenecientes(nombre)
      } else {
        this.limpiarCuadrosVentasTotales()
        const datos = document.getElementById("contenedorDatos");

        // Eliminar cuadros si no se selecciona ningún equipo líder
        datos.innerHTML = 
        `
        <div class="estadistica">
        <div class="titulo">
            <p>Ventas Totales</p>
        </div>
         
        <div class="valor">
           <p></p>
        </div>

        <div class="icono">
           <i class="fa-solid fa-money-check-dollar"></i>
        </div>                                
    </div>

    <div class="estadistica">
        <div class="titulo">
            <p>Ventas Diciembre</p>
        </div>
         
        <div class="valor">
           <p></p>
        </div>

        <div class="icono">
           <i class="fa-solid fa-money-check-dollar"></i>
        </div>                                
    </div>

    <div class="estadistica">
        <div class="titulo">
            <p>Ventas Enero</p>
        </div>
         
        <div class="valor">
           <p></p>
        </div>

        <div class="icono">
           <i class="fa-solid fa-money-check-dollar"></i>
        </div>                                
    </div>

    <div class="estadistica">
        <div class="titulo">
            <p>Ventas Febrero</p>
        </div>
         
        <div class="valor">
           <p></p>
        </div>

        <div class="icono">
           <i class="fa-solid fa-money-check-dollar"></i>
        </div>                                
    </div>        
        `;
      }
    });
  },
  
  datosEstadisticos(res) {
    const datosVentas = res.data;
    this.limpiarCuadrosVentasTotales()
    this.llenarCuadroVentasTotales('ventasTotales', datosVentas.cant_ventas_realizadas, "Ventas Totales");
    this.llenarCuadroVentasTotales('ventasDiciembre', datosVentas.cant_ventas_diciembre, "Ventas Diciembre");
    this.llenarCuadroVentasTotales('ventasEnero', datosVentas.cant_ventas_enero, "Ventas Enero");
    this.llenarCuadroVentasTotales('ventasFebrero', datosVentas.cant_ventas_febrero, "Ventas Febrero");

  },
  
  llenarCuadroVentasTotales(nombreCuadro, cant_venta_totales, titulo) {
    const datos = document.getElementById("contenedorDatos");
    let contenidoDatos = document.getElementById(nombreCuadro);
    if (!contenidoDatos) {
      contenidoDatos = document.createElement('div');
      contenidoDatos.id = nombreCuadro;
      datos.appendChild(contenidoDatos);
    }
  
    contenidoDatos.innerHTML = `
    <div class="estadistica">
      <div class="titulo">
        <p>${titulo}</p>
       </div>
       <div class="valor">
          <p>${cant_venta_totales}</p>
       </div>
      <div class="icono">
        <i class="fa-solid fa-money-check-dollar"></i>
      </div>                    
    </div>
 
    `;
  },
  
  limpiarCuadrosVentasTotales() {
    const datos = document.getElementById("contenedorDatos");
    datos.innerHTML = ""; // Eliminar todos los cuadros de ventas
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

  crearGraficoLineas(myChart, ventasMiguel, ventasRay, ventasDavina, ventasLaureano) {

    new Chart(myChart, {
        type: 'line',
        data: {
            labels: ['Octubre', 'Noviembre', 'Diciembre', 'Enero'],
            datasets: [
                {
                    label: 'Ventas Miguel',
                    data: ventasMiguel,
                    borderWidth: 1
                },
                {
                    label: 'Ventas Ray',
                    data: ventasRay,
                    borderWidth: 1
                },
                {
                    label: 'Ventas Davina',
                    data: ventasDavina,
                    borderWidth: 1
                },
                {
                    label: 'Ventas Laureano',
                    data: ventasLaureano,
                    borderWidth: 1
                },
            ],
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                    }
                }
            },
        },
    });
},

  mostrarGraficas(ventas_miguel, ventas_ray, ventas_davina, ventas_laureano) {

      const myChart = document.getElementById('myChart')

      const ventasMiguel = [ventas_miguel.data['cant_ventas_octubre'], ventas_miguel.data['cant_ventas_noviembre'], ventas_miguel.data['cant_ventas_diciembre'], ventas_miguel.data['cant_ventas_enero']]
      const ventasRay = [ventas_ray.data['cant_ventas_octubre'], ventas_ray.data['cant_ventas_noviembre'], ventas_ray.data['cant_ventas_diciembre'], ventas_ray.data['cant_ventas_enero']]
      const ventasDavina = [ventas_davina.data['cant_ventas_octubre'], ventas_davina.data['cant_ventas_noviembre'], ventas_davina.data['cant_ventas_diciembre'], ventas_davina.data['cant_ventas_enero']]
      const ventasLaureano = [ventas_laureano.data['cant_ventas_octubre'], ventas_laureano.data['cant_ventas_noviembre'], ventas_laureano.data['cant_ventas_diciembre'], ventas_laureano.data['cant_ventas_enero']]

      this.crearGraficoLineas(myChart, ventasMiguel, ventasRay, ventasDavina, ventasLaureano)

  },

  redirigirAIndex() {
    location.href = ("../../home.html");
},
};

export default Vista;
document.addEventListener("DOMContentLoaded", function () {

  const rol = localStorage.getItem("rol");
  if(rol == "agente"){
      Vista.redirigirAIndex()
  }

  Vista.opcionesMenu();
  Vista.obtenerNombre()
  Controlador.ventasPorLiderEquipo();
  Controlador.traerAgentesPertenecientes();
  General.horaActual;
  setInterval(General.horaActual, 1000);
});
 
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
