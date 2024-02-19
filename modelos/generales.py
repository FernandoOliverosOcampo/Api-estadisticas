from config import *
from librerias import *
from modelos.supabase.keys import *



supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


# Cambiar tabla destino para realizar pruebas | Produccion: 'VENTAS_REALIZADAS' | Pruebas: 'VENTAS_REALIZADAS_MAL'
tabla_ventas_pruebas = 'VENTAS_REALIZADAS_MAL'
tabla_ventas_produccion = 'VENTAS_REALIZADAS'

# Cambiar tabla destino para realizar pruebas | Produccion: 'AGENTES' | Pruebas: 'AGENTES_MAL'
tabla_agentes_pruebas = 'AGENTES_MAAL'
tabla_agentes_produccion = 'AGENTES'

# Supabase solamente exporta hasta 1000 registros, por eso se traen los mayores a 1000. (Hay alrededor de 1700 registros 16/02/2024)
cant_ventas_mostrar = 1000


def diccionario_vacio(data_dict):
    campos_vacios = [key for key, value in data_dict.items() if value is None or value == ""]
    if campos_vacios:
        return campos_vacios
    else: 
        return False

# Guardar cada acción que se haga como agregar, eliminar o editar registros       
def guardar_historial(tabla, accion, usuario, descripcion):
        
        try:

            datos_js = {
                "tabla": tabla,
                "accion": accion,
                "usuario": usuario,
                "descripcion": descripcion,
             }  

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            response_data = supabase.table('HISTORIAL_MAL').insert([datos_js]).execute()

            return datos_js

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
