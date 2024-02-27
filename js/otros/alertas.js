const swalAlert = {

    confirmarAccion(opciones) {
        const {
            texto,
            funcionAlAceptar,
            funcionAlCancelar,
            confirmButtonText = 'Aceptar',
            cancelButtonText = 'Cancelar',
            mensajeAlCancelar,
            titulo = '¿Estás seguro?',
            icono = 'warning'
        } = opciones;

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: titulo,
            text: texto,
            icon: icono,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                if (funcionAlAceptar) {
                    funcionAlAceptar();
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (funcionAlCancelar) {
                    funcionAlCancelar();
                } else {
                    swalWithBootstrapButtons.fire(
                        'Cancelado',
                        mensajeAlCancelar,
                        'error'
                    );
                }
            }
        });
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
    }

}

export default swalAlert;