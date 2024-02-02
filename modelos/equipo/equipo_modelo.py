from config import *
from librerias import *
from modelos.supabase.keys import *

class Equipo():

    def info_equipo(self, lider_equipo):

        try:
            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?lider_equipo=eq.{lider_equipo}',
                                        headers = headers)
            response_data = json.loads(response.text)
            
            #Todas las ventas realizadas por el agente
            ventas_realizadas =[]

            #Ventas según el mes
            ventas_octubre = []
            ventas_noviembre = []
            ventas_diciembre = []
            ventas_enero = []

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response_data), 1):
                ventas_realizadas.append(response_data[i])

            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes octubre
                if formato_fecha.month == 10:   
                    ventas_octubre.append(ventas_realizadas[i])

                # Mes noviembre
                if formato_fecha.month == 11:   
                    ventas_noviembre.append(ventas_realizadas[i])

                # Mes diciembre
                if formato_fecha.month == 12:
                    ventas_diciembre.append(ventas_realizadas[i])

                # Mes Enero
                if formato_fecha.month == 1:
                    ventas_enero.append(ventas_realizadas[i])
                    
            cant_ventas_realizadas = len(response_data)
            cant_ventas_octubre = len(ventas_octubre)
            cant_ventas_noviembre = len(ventas_noviembre)
            cant_ventas_diciembre = len(ventas_diciembre)
            cant_ventas_enero = len(ventas_enero)

            return jsonify({
                "cant_ventas_realizadas" : cant_ventas_realizadas,
                "cant_ventas_octubre" : cant_ventas_octubre,
                "cant_ventas_noviembre" : cant_ventas_noviembre,
                "cant_ventas_diciembre" : cant_ventas_diciembre,
                "cant_ventas_enero" : cant_ventas_enero
                })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def agentes_pertenecientes(self, lider_equipo):
        try:
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            response = supabase.table('AGENTES').select("cedula", "apodo", "nombre").eq("lider_equipo", lider_equipo).execute()
            agentes = []
            for i in range(0, len(response.data), 1):
                agentes.append(response.data[i])
            
            return jsonify({"agentes_pertenecientes": agentes}), 200

        except requests.exceptions.HTTPError as err:
            print(err)
        return 201    
  
    def ventas_realizadas(self):
        try:
            cedula = request.json.get('cedula')
            lider_equipo = request.json.get('lider_equipo')

            datos_buscar = {
                'cedula': cedula,
                'lider_equipo': lider_equipo,
            }

            datos_buscar_agente = json.dumps(datos_buscar)

            ventas_realizadas = []

            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?lider_equipo=eq.{lider_equipo}',
                                        headers = headers)
            response_data = json.loads(response.text)

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response_data), 1):
                ventas_realizadas.append(response_data[i]['cedula'])

            return jsonify({"hola": "hola"}), 200
                                       
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201                     
