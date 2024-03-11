from imports import *
from librerias import *
from rutas.inicio_sesion_ruta import *
from rutas.agente_ruta import *
from rutas.venta_ruta import *
from rutas.equipo_ruta import *

app = Flask(__name__)
jwt = JWTManager(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['JWT_SECRET_KEY'] = 'super-secret' # Clave secreta para firmar los JWT

# GENERALES
app.register_blueprint(iniciar_sesion)
app.register_blueprint(descargar_ventas_realizadas)

# AGENTE
app.register_blueprint(mostrar_datos_personales)
app.register_blueprint(estadisticas)
app.register_blueprint(registrar_agente)
app.register_blueprint(cambiar_contrasena)
app.register_blueprint(actualizar_agente)
app.register_blueprint(eliminar_usuario)

# VENTA
app.register_blueprint(mostrar_todas_ventas_realizadas)
app.register_blueprint(mostrar_ventas_realizadas)
app.register_blueprint(mostrar_estado_ventas)
app.register_blueprint(mostrar_ventas_semana_actual)
app.register_blueprint(mostrar_ventas_mes_especifico)
app.register_blueprint(mostrar_ventas_mensuales)
app.register_blueprint(registrar_venta)
app.register_blueprint(editar_venta)
app.register_blueprint(editar_venta_calidad)
app.register_blueprint(editar_venta_estado)
app.register_blueprint(eliminar_venta)
app.register_blueprint(mostrar_por_fecha)
app.register_blueprint(filtrar_tabla)
app.register_blueprint(mostrar_por_estado)
app.register_blueprint(mostrar_por_intervalo)
app.register_blueprint(editar_venta_team_leader)
app.register_blueprint(estadisticas_venta_dia)
app.register_blueprint(estadisticas_agentes_mensual)
app.register_blueprint(ventas_agente_semana_actual)
app.register_blueprint(buscar_codigo_postal)
app.register_blueprint(mostrar_por_fecha_leader)
app.register_blueprint(filtro_tabla_leader)
app.register_blueprint(mostrar_por_intervalo_leader)

# TEAM LEADER
app.register_blueprint(agentes_pertenecientes)
app.register_blueprint(info_equipo)
app.register_blueprint(lista_agentes)
app.register_blueprint(traer_usuarios)


#Pagina de error
def pagina_no_encontrada(error):
    return "<h1>La pagina a la que intentas acceder no existe...</h1>"

if __name__=="__main__":
    app.register_error_handler(404 , pagina_no_encontrada)
    app.run(host="0.0.0.0",port = 5700, debug=True)