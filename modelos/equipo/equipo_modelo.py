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
            ventas_diciembre = []
            ventas_enero = []
            ventas_febrero = []

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response_data), 1):
                ventas_realizadas.append(response_data[i])

            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes diciembre
                if formato_fecha.month == 12:
                    ventas_diciembre.append(ventas_realizadas[i])

                # Mes Enero
                if formato_fecha.month == 1:
                    ventas_enero.append(ventas_realizadas[i])

                # Mes Febrero
                if formato_fecha.month == 2:   
                    ventas_febrero.append(ventas_realizadas[i])

                    
            cant_ventas_realizadas = len(response_data)
            cant_ventas_febrero = len(ventas_febrero)
            cant_ventas_diciembre = len(ventas_diciembre)
            cant_ventas_enero = len(ventas_enero)

            return jsonify({
                "cant_ventas_realizadas" : cant_ventas_realizadas,
                "cant_ventas_diciembre" : cant_ventas_diciembre,
                "cant_ventas_enero" : cant_ventas_enero,
                "cant_ventas_febrero" : cant_ventas_febrero
                })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def agentes_pertenecientes(self, lider_equipo):
        try:
            from collections import Counter

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            response = supabase.table('AGENTES').select("cedula", "apodo", "nombre").eq("lider_equipo", lider_equipo).execute()
            response2 = supabase.table('VENTAS_REALIZADAS').select("nombre_agente", "fecha_ingreso_venta").eq("lider_equipo", lider_equipo).execute()
            ventas_realizadas = []
            ventas_febrero = []

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response2.data), 1):
                ventas_realizadas.append(response2.data[i])

                    #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes diciembre
                if formato_fecha.month == 2:
                    ventas_febrero.append(ventas_realizadas[i])

            # Contar la frecuencia de cada nombre de agente
            frecuencia_nombres = Counter(agente['nombre_agente'] for agente in ventas_febrero)
            
            agentes = []
            for i in range(0, len(response.data), 1):
                agentes.append(response.data[i])

            # Crear una nueva lista que combine la información de los agentes y sus frecuencias
            resultado_combinado = []

            for info_agente in agentes:
                apodo = info_agente['apodo']
                frecuencia = frecuencia_nombres.get(apodo, 0)  # Obtener la frecuencia, si no existe es 0
                info_agente['ventas_mes_actual'] = frecuencia
                resultado_combinado.append(info_agente)
            
            return jsonify({"agentes_pertenecientes": resultado_combinado}), 200

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
