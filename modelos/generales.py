from config import *
from librerias import *
from modelos.supabase.keys import *

def guardar_historial(tabla, accion, usuario, descripcion):
        
        print(tabla)
        print(accion)
        print(usuario)
        print(descripcion)

        try:

            datos_js = {
                "tabla": tabla,
                "accion": accion,
                "usuario": usuario,
                "descripcion": descripcion,
             }
            
            print(datos_js)

            #supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            #response_data = supabase.table('HISTORIAL').insert([datos_js]).execute()

            #print(response_data)
             
            return datos_js

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
