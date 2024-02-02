from controladores.agente.agente_controlador import *
from librerias import *

con_agente = AgenteControlador()
mostrar_datos_personales = Blueprint('mostrar_datos_personales', __name__)
estadisticas = Blueprint('estadisticas', __name__)
registrar_agente = Blueprint('registrar_agente', __name__)

@mostrar_datos_personales.route('/mostrar-datos-personales/<cedula>', methods=['GET'])
@cross_origin()
def datos_personales(cedula):
   return con_agente.mostrar_datos_personales(cedula)

@estadisticas.route('/estadisticas/<cedula>', methods=['GET'])
@cross_origin()
def estadisticas_agente(cedula):
   return con_agente.estadisticas(cedula)

@registrar_agente.route('/registro-agente/', methods=['POST'])
@cross_origin()
def registro_agentes():
   return con_agente.registro_de_agente()

