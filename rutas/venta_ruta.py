from controladores.venta.venta_controlador import *
from librerias import *

con_venta = VentaControlador()
mostrar_todas_ventas_realizadas = Blueprint('mostrar_todas_ventas_realizadas', __name__)
mostrar_ventas_realizadas = Blueprint('mostrar_ventas_realizadas', __name__)
mostrar_estado_ventas = Blueprint('mostrar_estado_ventas', __name__)
mostrar_ventas_semana_actual = Blueprint('mostrar_ventas_semana_actual', __name__)
mostrar_ventas_mes_especifico = Blueprint('mostrar_ventas_mes_especifico', __name__)
mostrar_ventas_mensuales = Blueprint('mostrar_ventas_mensuales', __name__)
registrar_venta = Blueprint('registrar_venta', __name__)
editar_venta = Blueprint('editar_venta', __name__)
editar_venta_calidad = Blueprint('editar_venta_calidad', __name__)


# RUTAS GET
@mostrar_todas_ventas_realizadas.route('/mostrar-ventas/', methods=['GET'])
@cross_origin()
def mostrar_todas_las_ventas_realizadas():
   return con_venta.mostrar_todas_ventas_realizadas()

@mostrar_ventas_realizadas.route('/mostrar-ventas-realizadas/<cedula>', methods=['GET'])
@cross_origin()
def ventas_realizadas(cedula):
   return con_venta.mostrar_ventas_realizadas(cedula)

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

@registrar_venta.route('/registrar-venta/', methods=['POST'])
@cross_origin()
def registro_venta():
   return con_venta.registrar_venta()

# RUTAS PUT

@editar_venta.route('/editar-venta/', methods=['PUT'])
@cross_origin()
def edito_venta():
   return con_venta.editar_venta()


@editar_venta.route('/editar-venta-calidad/', methods=['PUT'])
@cross_origin()
def edito_venta_calidad():
   return con_venta.editar_venta_calidad()



