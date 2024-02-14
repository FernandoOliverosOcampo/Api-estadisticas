from modelos.inicio_sesion.inicio_sesion_modelo import *

mod_inicio_sesion = Usuario()

class IniciarSesionControlador():
    
    def inicio_sesion(self):
        query = mod_inicio_sesion.login()
        return query