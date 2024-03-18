from controladores.agente.agente_controlador import *
from librerias import *

con_agente = AgenteControlador()
mostrar_datos_personales = Blueprint('mostrar_datos_personales', __name__)
estadisticas = Blueprint('estadisticas', __name__)
registrar_agente = Blueprint('registrar_agente', __name__)
actualizar_agente = Blueprint('actualizar_agente', __name__)
eliminar_usuario = Blueprint('eliminar_usuario', __name__)
cambiar_contrasena = Blueprint('cambiar_contrasena', __name__)

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

@cambiar_contrasena.route('/cambiar-contrasena/', methods=['PUT'])
@cross_origin()
def put_cambiar_contrasena():
   return con_agente.cambiar_contrasena()

@actualizar_agente.route('/actualizar-informacion-agente/', methods=['PUT'])
@cross_origin()
def actualizar_info_agente():
   return con_agente.actualizar_agente()

@eliminar_usuario.route('/eliminar-usuario/', methods=['DELETE'])
@cross_origin()
def delete_eliminar_usuario():
   return con_agente.eliminar_usuario()

