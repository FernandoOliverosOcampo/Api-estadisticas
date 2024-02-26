from controladores.venta.venta_controlador import *
from librerias import *

con_venta = VentaControlador()
descargar_ventas_realizadas = Blueprint('descargar_ventas_realizadas', __name__)
mostrar_todas_ventas_realizadas = Blueprint('mostrar_todas_ventas_realizadas', __name__)
mostrar_ventas_realizadas = Blueprint('mostrar_ventas_realizadas', __name__)
mostrar_estado_ventas = Blueprint('mostrar_estado_ventas', __name__)
mostrar_ventas_semana_actual = Blueprint('mostrar_ventas_semana_actual', __name__)
mostrar_ventas_mes_especifico = Blueprint('mostrar_ventas_mes_especifico', __name__)
mostrar_ventas_mensuales = Blueprint('mostrar_ventas_mensuales', __name__)
registrar_venta = Blueprint('registrar_venta', __name__)
editar_venta = Blueprint('editar_venta', __name__)
editar_venta_calidad = Blueprint('editar_venta_calidad', __name__)
editar_venta_estado = Blueprint('editar_venta_estado', __name__)
eliminar_venta = Blueprint('eliminar_venta', __name__)
mostrar_por_fecha = Blueprint('mostrar_por_fecha', __name__)
editar_venta_team_leader = Blueprint('editar_venta_team_leader', __name__)
mostrar_por_estado = Blueprint('mostrar_por_estado', __name__)
filtrar_tabla = Blueprint('filtrar_tabla', __name__)
mostrar_por_intervalo = Blueprint('mostrar_por_intervalo', __name__)
estadisticas_venta_dia = Blueprint('estadisticas_venta_dia', __name__)
estadisticas_agentes_mensual = Blueprint('estadisticas_agentes_mensual', __name__)
ventas_agente_semana_actual = Blueprint('ventas_agente_semana_actual', __name__)
buscar_codigo_postal = Blueprint('buscar_codigo_postal', __name__)



# RUTAS GET
@descargar_ventas_realizadas.route('/descargar-ventas/', methods=['GET'])
@cross_origin()
def get_descargar_ventas_realizadas():
   return con_venta.descargar_ventas_realizadas()

@mostrar_todas_ventas_realizadas.route('/mostrar-ventas/', methods=['GET'])
@cross_origin()
def mostrar_todas_las_ventas_realizadas():
   return con_venta.mostrar_todas_ventas_realizadas()

@mostrar_ventas_realizadas.route('/mostrar-ventas-realizadas/<cedula>', methods=['GET'])
@cross_origin()
def ventas_realizadas(cedula):
   return con_venta.mostrar_ventas_realizadas(cedula)

@registrar_venta.route('/registrar-venta/', methods=['POST'])
@cross_origin()
def registro_venta():
   return con_venta.registrar_venta()

@editar_venta.route('/editar-venta/', methods=['PUT'])
@cross_origin()
def edito_venta():
   return con_venta.editar_venta()

@editar_venta.route('/editar-venta-calidad/', methods=['PUT'])
@cross_origin()
def edito_venta_calidad():
   return con_venta.editar_venta_calidad()

@editar_venta_estado.route('/editar-venta-estado/', methods=['PUT'])
@cross_origin()
def edito_estado_venta():
   return con_venta.editar_estado_venta()

@eliminar_venta.route('/eliminar-venta/<id>', methods=['DELETE'])
@cross_origin()
def delete_eliminar_venta(id):
   return con_venta.eliminar_venta(id)

@editar_venta_team_leader.route('/editar-venta-team-leader/', methods=['PUT'])
@cross_origin()
def get_editar_venta_team_leader():
   return con_venta.editar_venta_team_leader()

@mostrar_por_fecha.route('/mostrar-por-fecha/', methods=['POST'])
@cross_origin()
def mostrar_tabla_venta():
   return con_venta.venta_por_fecha()

@mostrar_por_estado.route('/mostrar-por-estado/', methods=['POST'])
@cross_origin()
def mostrar_tabla_venta_estado():
   return con_venta.venta_por_estado()

@filtrar_tabla.route('/filtrar-tabla/', methods=['POST'])
@cross_origin()
def post_filtrar_tabla():
   return con_venta.filtrar_tabla()

@mostrar_por_intervalo.route('/mostrar-por-intervalo/', methods=['POST'])
@cross_origin()
def mostrar_tabla_venta_intervalo():
   return con_venta.venta_por_intervalo()

@estadisticas_venta_dia.route('/estadisticas-venta-dia/', methods=['GET'])
@cross_origin()
def get_estadisticas_venta_dia():
   return con_venta.estadisticas_venta_dia()

@estadisticas_agentes_mensual.route('/estadisticas-agentes-mensual/', methods=['GET'])
@cross_origin()
def get_estadisticas_agentes_mensual():
   return con_venta.estadisticas_agentes_mensual()

@ventas_agente_semana_actual.route('/ventas-agente-semana-actual/', methods=['GET'])
@cross_origin()
def get_ventas_agente_semana_actual():
   return con_venta.ventas_agente_semana_actual()

@buscar_codigo_postal.route('/info-codigo/', methods=['POST'])
@cross_origin()
def buscar_codigos_postales():
   return con_venta.buscar_codigo_postal()






@mostrar_ventas_semana_actual.route('/venta-semana-actual/<cedula>', methods=['GET'])
@cross_origin()
def venta_semana_actual(cedula):
   return con_venta.mostrar_ventas_semana_actual(cedula)

# RUTAS POST
@mostrar_estado_ventas.route('/estado-ventas/', methods=['POST'])
@cross_origin()
def estado_ventas():
   return con_venta.mostrar_estado_ventas()


@mostrar_ventas_mes_especifico.route('/venta-mes/', methods=['POST']) #cedula y mes
@cross_origin()
def venta_mes():
   return con_venta.mostrar_ventas_mes_especifico()


# RUTAS DELETE

