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

def comparar_informacion(registro_anterior, registro_nuevo):
    # Columnas a seleccionar a la hora de buscar registros en VENTAS_REALIZADAS
    columnas = [
        "compania", "nombre", "dni", "telefono", "telefono_fijo", "correo", "direccion", 
        "fecha_nacimiento", "cups_luz", "cups_gas", "iban", "numero_contrato", 
        "potencia", "peaje_gas", "tipo_mantenimiento", "verificacion_calidad", "llamada_calidad", 
        "calidad_enviada", "observaciones_calidad", "audios_cargados", 
        "estado", "observaciones_adicionales", "legalizacion", "nombre", "correo", "celular", "campana", "lider_responsable",
        "lider_equipo", "grupo"
    ]

    cambios = {}
    try:
        #Comparar el registro original con el nuevo (que se va a editar)
        for key in registro_anterior[0]:
            if registro_anterior[0][key] != registro_nuevo[key]:
                if key in columnas:
                    cambios[f'{key}_anterior'] = registro_anterior[0][key]
                    cambios[f'{key}_nuevo'] = registro_nuevo[key]

        return cambios
         
    except Exception as e:
        print("Ocurrió un error:", e)


# Guardar cada acción que se haga como agregar, eliminar o editar registros       
def guardar_historial(tabla, id_registro, accion, usuario, cambios):
        try:
            datos_js = {
                "tabla": tabla,
                "id_registro": id_registro,
                "accion": accion,
                "usuario": usuario,
                "descripcion": cambios,
             } 
            
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            response_data = supabase.table('HISTORIAL').insert([datos_js]).execute()

            return datos_js

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201