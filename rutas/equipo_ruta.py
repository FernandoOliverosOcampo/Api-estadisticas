from controladores.equipo.equipo_controlador import *
from librerias import *

con_equipo = EquipoControlador()
info_equipo = Blueprint('info_equipo', __name__)
venta_realizadas_agente_equipo = Blueprint('venta_realizadas_agente_equipo', __name__)
agentes_pertenecientes = Blueprint('agentes_pertenecientes', __name__)

@info_equipo.route('/info-equipo/<lider_equipo>', methods=['GET'])
@cross_origin()
def informacion_equipo(lider_equipo):
   return con_equipo.info_equipo(lider_equipo)

@venta_realizadas_agente_equipo.route('/venta-realizadas-agente-equipo/', methods=['POST'])
def ventas_agente_equipo():
   return con_equipo.venta_realizadas_agente_equipo()

@agentes_pertenecientes.route('/agentes-pertenecientes/<lider_equipo>', methods=['GET'])
def agentes_equipo(lider_equipo):
   return con_equipo.agentes_pertenecientes(lider_equipo)