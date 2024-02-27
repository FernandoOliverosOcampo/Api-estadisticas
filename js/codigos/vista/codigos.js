import General from "../../general/general.js"
import Controlador from "../controlador/controlador_codigos.js";
const Vista = {

    codigoPostalBuscar() {
        const codigo = document.getElementById('codigoPostal').value;
        return { codigo }
    },

    mostrarDatosCodigo(res) {

        const datos = res.data
        const codigoPostal = datos['codigo_postal']
        const nombreProvincia = datos['nombre_provincia']
        const nombreComunidad = datos['nombre_comunidad']
        const provinciaNombre = nombreProvincia.replace(/�/g, 'Ñ')
        const comunidadNombre = nombreComunidad.replace(/�/g, 'Ñ')

        const contenedorCodigoPostal = document.getElementById('verCodigoPostal')
        const contenedorNombreProvincia = document.getElementById('verNombreProvincia')
        const contenedorNombreComunidad = document.getElementById('verNombreComunidad')
        const contenedorCuenta = document.getElementById("cuentaIngresar")

        if (codigoPostal == 'No encontrado') {

            contenedorCuenta.innerHTML = `
            <p> <b>No existe información para el código postal</p>
            `
        } else {

          

            contenedorCodigoPostal.innerHTML =
                `
                <p>${codigoPostal}</p>
            `;

            contenedorNombreProvincia.innerHTML =
                `
                <p>${provinciaNombre}</p>
            `;

            contenedorNombreComunidad.innerHTML =
                `
                <p>${comunidadNombre}</p>
            `;

        }
        if (comunidadNombre === 'CATALUÑA'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p>
            
            <ul>
            <li>USUARIO CATALUÑA</li>
            <li>CARLOS STEVEN VILLAMIZAR RUIZ</li>
            <li>ACREDICION: Y520420</li>
            <li>DNI: Y1264262N</li>
            <li>CLAVE: GrupoGestionex04!</li>
            </ul>
            `

        }else if (comunidadNombre === 'ARAGON'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO ARAGON</li>
            <li>VICENTE JAVIER AGUDO BUENO</li>
            <li>ACREDICION: Y499260</li>
            <li>DNI: 06266215A</li>
            <li>CLAVE: GrupoGestionex04!</li>
            </ul>
            `
        }else if (comunidadNombre === 'BALEARES'){
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO BALEARES</li>
            <li>KAREN JULY HUANCA</li>
            <li>ACREDICION: YA75260</li>
            <li>DNI: 11782211R</li>
            <li>CLAVE: Gestionex.1</li>
            </ul>
            `
        }else{
            contenedorCuenta.innerHTML = `
            <p> <b>Nota: La venta debe ser registrada con la cuenta de : ${comunidadNombre}</p> <br>
            <ul>
            <li>USUARIO BALEARES</li>
            <li>KAREN JULY HUANCA</li>
            <li>ACREDICION: YA75260</li>
            <li>DNI: 11782211R</li>
            <li>CLAVE: Gestionex.1</li>
            </ul>
            
     
            `
        }




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

}
export default Vista;

document.addEventListener('DOMContentLoaded', function () {
    General.horaActual()
    setInterval(General.horaActual, 1000);
    Vista.opcionesMenu()
   
});

const btnBuscarCodigo = document.getElementById('btnBuscarCodigo');

btnBuscarCodigo.onclick = function () {
    Controlador.datosCodigoPostal()
}

const botonEnter = document
botonEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        Controlador.datosCodigoPostal();
    }
});

const abrirMenuOpciones = document.getElementById('abrirMenuOpciones');
const opcionesPerfil = document.getElementById('opcionesPerfil');

abrirMenuOpciones.onclick = function () {
    if (opcionesPerfil.style.display === "none" || opcionesPerfil.style.display === "") {
        opcionesPerfil.style.display = "block";
    } else {
        opcionesPerfil.style.display = "none";
    }
};