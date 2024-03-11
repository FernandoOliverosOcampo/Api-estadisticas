from controladores.equipo.equipo_controlador import *
from librerias import *

con_equipo = EquipoControlador()

info_equipo = Blueprint('info_equipo', __name__)
agentes_pertenecientes = Blueprint('agentes_pertenecientes', __name__)
lista_agentes = Blueprint('lista_agentes', __name__)
traer_usuarios = Blueprint('traer_usuarios', __name__)


@info_equipo.route('/info-equipo/<lider_equipo>', methods=['GET'])
@cross_origin()
def informacion_equipo(lider_equipo):
   return con_equipo.info_equipo(lider_equipo)

@agentes_pertenecientes.route('/agentes-pertenecientes/<lider_equipo>', methods=['GET'])
@cross_origin()
def agentes_equipo(lider_equipo):
   return con_equipo.agentes_pertenecientes(lider_equipo)

@lista_agentes.route('/lista-agentes/<lider_equipo>', methods=['GET'])
@cross_origin()
def get_lista_agentes(lider_equipo):
   return con_equipo.lista_agentes(lider_equipo)

@traer_usuarios.route('/traer-usuarios/', methods=['GET'])
@cross_origin()
def get_traer_usuarios():
   return con_equipo.traer_usuarios()