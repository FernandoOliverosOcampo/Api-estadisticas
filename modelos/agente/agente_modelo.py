from config import *
from librerias import *
from modelos.supabase.keys import *

class Agente():

    def mostrar_datos_personales(self, cedula):

        try:
            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/AGENTES?cedula=eq.{cedula}',
                                        headers = headers)
            response_data = json.loads(response.text)

            return jsonify({
                "cedula": response_data[0]['cedula'],
                "nombre": response_data[0]['nombre'],
                "celular":response_data[0]['celular'],
                "estado": response_data[0]['estado'],
                "grupo": response_data[0]['grupo'],
                "campana": response_data[0]['campana'],
                "lider_responsable":response_data[0]['lider_responsable'] ,
                "lider_equipo": response_data[0]['lider_equipo'],
                "rol": response_data[0]['rol'],
                "correo": response_data[0]['correo'],
                "apodo": response_data[0]['apodo']
                })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
    

     
    def estadisticas(self, cedula):
        try:
            print("ejecutando estadisticas")
            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?cedula=eq.{cedula}',
                                    headers = headers)
            response_data = json.loads(response.text)

            # Cantidad de ventas según su estado
            cant_ventas_activas, cant_ventas_no_facturables, cant_ventas_pendiente, cant_ventas_opcion_no_seleccionada = self.cant_ventasX_estado(response_data)
            #asd = self.cant_ventasX_estado(response_data)
            # Sacar los datos de las fechas
            fecha_actual, primer_dia_semana, ultimo_dia_semana, dias_transcurridos = self.datos_fecha()

            # Obtener las ventas que se realizaron en la semana actual
            ventas_semana_actual = self.ventas_semana_actual(response_data, primer_dia_semana, ultimo_dia_semana)

            print(ventas_semana_actual)

            total_ventas_mes_actual = len(self.ventas_mes_actual(response_data))

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

            #Finales
            cant_ventas = len(response_data)
            cant_ventas_semana = len(ventas_semana_actual)
            prom_venta_semana_actual = cant_ventas_semana / dias_transcurridos
            prom_venta_mes_actual = round(len(response_data) / 30, 2)

            return jsonify({
                "cant_ventas_totales": cant_ventas,
                "cant_ventas_semana_actual": cant_ventas_semana,
                "prom_venta_semana_actual": prom_venta_semana_actual,
                "cant_ventas_mes_actual": total_ventas_mes_actual,
                "prom_venta_mes_actual": prom_venta_mes_actual,
                "cant_ventas_activas": cant_ventas_activas,
                "cant_ventas_no_facturables": cant_ventas_no_facturables,
                "cant_ventas_pendiente": cant_ventas_pendiente,
                "cant_ventas_opcion_no_seleccionada": cant_ventas_opcion_no_seleccionada,
                "cant_ventas_realizadas" : cant_ventas_realizadas,
                "cant_ventas_diciembre" : cant_ventas_diciembre,
                "cant_ventas_enero" : cant_ventas_enero,
                "cant_ventas_febrero" : cant_ventas_febrero
            })

        except requests.exceptions.HTTPError as err:
            print(err)
        return 201

    def datos_fecha(self):
        # Obtener la fecha actual
        fecha_actual = datetime.now()

        # Obtener el primer día de la semana actual (lunes)
        primer_dia_semana = fecha_actual - timedelta(days = fecha_actual.weekday())
        primer_dia_semana = primer_dia_semana.replace(hour = 0, minute = 0, second = 0, microsecond = 0)

        # Obtener el último día de la semana actual (viernes)
        ultimo_dia_semana = primer_dia_semana + timedelta(days = 4)
        ultimo_dia_semana = ultimo_dia_semana.replace(hour = 23, minute = 59, second = 59, microsecond = 999999)     

        # Calcular la cantidad de días transcurridos en la semana actual
        dias_transcurridos = (fecha_actual - primer_dia_semana).days + 1

        return fecha_actual, primer_dia_semana, ultimo_dia_semana, dias_transcurridos
    
    def ventas_semana_actual(self, response_data, primer_dia_semana, ultimo_dia_semana):
        # Filtro de ventas según la semana actual
        ventas_semana_actual = []

        for venta in response_data:
            formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")

            # Verificar si la venta ocurrió dentro de la semana actual
            if primer_dia_semana <= formato_fecha <= ultimo_dia_semana:
                ventas_semana_actual.append(venta)  

        return ventas_semana_actual
    
    def ventas_mes_actual(self, response_data):

        ventas_realizadas = []
        ventas_febrero = []

        #Las ventas totales que ha realizado el asesor
        for i in range(0, len(response_data), 1):
            ventas_realizadas.append(response_data[i])

                #Filtro de ventas según los meses
        for i in range(0, len(ventas_realizadas), 1):
            formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

            # Mes diciembre
            if formato_fecha.month == 2:
                ventas_febrero.append(ventas_realizadas[i])

        return ventas_febrero

    def cant_ventasX_estado(self, response_data):
        ventas_activas = []
        ventas_no_facturables = []
        ventas_pendiente = []
        ventas_opcion_no_seleccionada = []

        for venta in response_data:
            formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and venta['estado'] == "activa":
                ventas_activas.append(venta)
                
            # Filtro de ventas según el estado "no facturable"
            if formato_fecha.year == 2024 and venta['estado'] == "no facturable":
                ventas_no_facturables.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and venta['estado'] == "pendiente":
                ventas_pendiente.append(venta)

            # Filtro de ventas según el estado "opcion no seleccionada"
            if formato_fecha.year == 2024 and venta['estado'] == "opcion no seleccionada":
                ventas_opcion_no_seleccionada.append(venta)

        cant_ventas_activas = len(ventas_activas)
        cant_ventas_no_facturables = len(ventas_no_facturables)
        cant_ventas_pendiente = len(ventas_pendiente)
        cant_ventas_opcion_no_seleccionada = len(ventas_opcion_no_seleccionada)

        return cant_ventas_activas, cant_ventas_no_facturables, cant_ventas_pendiente, cant_ventas_opcion_no_seleccionada

    def registro_agentes(self):
        try:
            apodo = request.json.get('apodo')   
            nombre = request.json.get('nombre')
            cedula = request.json.get('cedula')
            correo = request.json.get('correo')
            celular = request.json.get('celular')
            estado = request.json.get('estado')
            grupo = request.json.get('grupo')
            campana = request.json.get('campana')
            lider_responsable = request.json.get('lider_responsable')
            lider_equipo = request.json.get('lider_equipo')
            rol =  request.json.get('rol')
            contrasena =  request.json.get('contrasena')
            usuario =  request.json.get('usuario')
            
            datos_js ={
                "apodo": apodo,
                "usuario": usuario,
                "nombre": nombre,
                "cedula": cedula,
                "correo": correo,
                "celular": celular,
                "estado": estado,
                "grupo": grupo,
                "campana": campana,
                "lider_responsable": lider_responsable,
                "lider_equipo": lider_equipo,
                "rol": rol,
                "contrasena": contrasena
            }
            
            datos_recordatorio = json.dumps(datos_js)
            
            response = requests.post(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/AGENTES',
                                    data = datos_recordatorio,
                                    headers = headers)
            
            print(response)
            
            return jsonify({"prubea": "xd"})
        
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def actualizar_agente(self):
        try:
            data_dict ={
                
                "nombre": request.json.get('nombre'),
                "correo": request.json.get('correo'),
                "celular": request.json.get('celular'),
                "campana": request.json.get('campana'),
                "lider_responsable": request.json.get('lider_responsable'),
                "lider_equipo":  request.json.get('lider_equipo')
                
            }
            
            apodo = request.json.get('apodo')
            
            
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            
            response_data = supabase.table('AGENTES').update(data_dict).eq('apodo', apodo).execute()
             
            return jsonify({"Compañia": "compania"})
        except requests.exceptions.HTTPError as err:
            print(err)
        return 201