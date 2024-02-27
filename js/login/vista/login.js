import Controlador from "../controlador/controlador_login.js";
const Vista = {
    //Método de la vista que recibe los valores que hay en el DOM y los retorna
    getDatosInicioSesion() {
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('contrasena').value;
        return { correo, password };
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

    vaciarCampos() {
        nombre.value = "";
        apellido.value = "";
        correo.value = "";
        titulo.value = "";
        descripcion.value = "";
    },

    redirigirAIndex() {
        location.href = ("../home.html");
    },

    redirigirAdmin() {
        location.href = ("./admin.html");
    },

    redirigirTeamLeader() {
        location.href = ("./team_leader/inicio_team_leader.html");
    },

    redirigirCalidad() {
        location.href = ("./admin/calidad.html");
    },

    redirigirReportes() {
        location.href = ("./admin/reportes.html");
    }
}
export default Vista;

const botonEnviar = document.getElementById('btnIngresar');
const botonEnter = document
botonEnter.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        Controlador.iniciarSesion();
    }
});

botonEnviar.onclick = function () {
    Controlador.iniciarSesion()
}