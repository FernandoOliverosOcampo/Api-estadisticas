from controladores.inicio_sesion.inicio_sesion_controlador import *
from librerias import *

con_inicio_sesion= IniciarSesionControlador()
iniciar_sesion = Blueprint('iniciar_sesion', __name__)

@iniciar_sesion.route('/iniciar-sesion/', methods=['POST'])

@cross_origin()
def inicio_sesion():
   return con_inicio_sesion.inicio_sesion()

