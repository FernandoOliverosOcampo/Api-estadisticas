from config import *
from librerias import *
from modelos.supabase.keys import *
from modelos.generales import *

class Agente():

    # Rutas

    # Muestra los datos personales de un agente mediante su cedula
    # /mostrar-datos-personales/<cedula>
    def mostrar_datos_personales(self, cedula):

        try:

            if cedula is None or cedula == "":
                return jsonify({"error" : "campo cedula vacío"}), 401

            response = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()

            response_data = response.data

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

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500
    
    # Muestra las estadisticas generales de un agente mediante su cedula
    # /estadisticas/<cedula>
    def estadisticas(self, cedula):
        try:

            if cedula is None or cedula == "":
                return jsonify({"error" : "campo cedula vacío"}), 401

            response = supabase.table(tabla_ventas_produccion).select("*").eq('cedula', cedula).order('id.desc').execute()

            response_data = response.data

            # Sacar los datos de las fechas
            fecha_actual, primer_dia_semana, ultimo_dia_semana, dias_transcurridos, dias_transcurridos_mes, mes_actual = self.datos_fecha()

            # Cantidad de ventas según su estado
            ventas_activas, ventas_temporal, ventas_baja, ventas_firmado, ventas_verificado, ventas_cancelada, ventas_desistimiento, ventas_devuelta, ventas_pendiente, ventas_recuperada, ventas_cumple_calidad, ventas_no_cumple_calidad = self.cant_ventasX_estado(response_data, mes_actual)

            # Obtener las ventas que se realizaron en la semana actual
            ventas_semana_actual = self.ventas_semana_actual(response_data, primer_dia_semana, ultimo_dia_semana)

            total_ventas_mes_actual = len(self.ventas_mes_actual(response_data))

            #Todas las ventas realizadas por el agente
            ventas_realizadas = []

            #Ventas según el mes
            ventas_diciembre = []
            ventas_enero = []
            ventas_febrero = []
            ventas_dia_actual = []

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
                
                
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")
                    
                if formato_fecha.day == fecha_actual.day and formato_fecha.month == fecha_actual.month:

                    ventas_dia_actual.append(ventas_realizadas[i])
            
            #------------------Finales-------------------
            # En ventas
            cant_ventas = len(response_data)
            cant_ventas_semana = len(ventas_semana_actual)
            cant_ventas_realizadas = len(response_data)
            cant_ventas_febrero = len(ventas_febrero)
            cant_ventas_diciembre = len(ventas_diciembre)
            cant_ventas_enero = len(ventas_enero)

            # Principales
            prom_venta_semana_actual = round(cant_ventas_semana / dias_transcurridos, 2)
            prom_venta_mes_actual = round(len(ventas_febrero) / dias_transcurridos_mes, 2)
            prom_ventas_diarias = round(prom_venta_mes_actual/ dias_transcurridos_mes, 2)
            cant_ventas_restantes = 26 - total_ventas_mes_actual
            porcCumplirMeta = round((total_ventas_mes_actual / 26) * 100)


            return jsonify({
                "cant_ventas_totales": cant_ventas,
                "cant_ventas_semana_actual": cant_ventas_semana,
                "cant_ventas_mes_actual": total_ventas_mes_actual,
                "cant_ventas_realizadas" : cant_ventas_realizadas,
                "cant_ventas_diciembre" : cant_ventas_diciembre,
                "cant_ventas_enero" : cant_ventas_enero,
                "cant_ventas_febrero" : cant_ventas_febrero,
                "cant_ventas_restantes": cant_ventas_restantes,
                "porcCumplirMeta": porcCumplirMeta,
                "prom_venta_semana_actual": prom_venta_semana_actual,
                "prom_venta_mes_actual": prom_venta_mes_actual,
                "prom_ventas_diarias": prom_ventas_diarias,
                "ventas_activas": ventas_activas,
                "ventas_temporal": ventas_temporal,
                "ventas_baja": ventas_baja,
                "ventas_firmado": ventas_firmado,
                "ventas_verificado": ventas_verificado,
                "ventas_cancelada": ventas_cancelada,
                "ventas_desistimiento": ventas_desistimiento,
                "ventas_devuelta": ventas_devuelta,
                "ventas_recuperada": ventas_recuperada,
                "ventas_pendiente": ventas_pendiente,
                "ventas_cumple_calidad": ventas_cumple_calidad,
                "ventas_no_cumple_calidad": ventas_no_cumple_calidad
            })

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Crea un nuevo agente
    # /registro-agente/
    def registro_agentes(self):
        try:

            datos_js ={
                "apodo": request.json.get('apodo'),
                "usuario": request.json.get('usuario'),
                "contrasena": request.json.get('contrasena'),
                "nombre": request.json.get('nombre'),
                "cedula": request.json.get('cedula'),
                "correo": request.json.get('correo'),
                "celular": request.json.get('celular'),
                "estado":  request.json.get('estado'),
                "grupo":  request.json.get('grupo'),
                "campana": request.json.get('campana'),
                "lider_responsable": request.json.get('lider_responsable'),
                "lider_equipo": request.json.get('lider_equipo'),
                "rol": request.json.get('rol')
            }

            campos_vacios = diccionario_vacio(datos_js)

            if campos_vacios:
                return jsonify({"registrar_agente_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400
            else:
                
                supabase.table(tabla_agentes_produccion).insert(datos_js).execute()

                return jsonify({"registro_agente_status": "OK"}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Actualiza la información relacionada a un usuario
    # /actualizar-informacion-agente/
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

            campos_vacios = diccionario_vacio(data_dict)

            if campos_vacios:
                return jsonify({"registrar_agente_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400
            
            supabase.table(tabla_agentes_produccion).update(data_dict).eq('apodo', apodo).execute()

            return jsonify({"actualizar_agente": "OK"}), 200
        
        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500
    
    # Funciones
    def datos_fecha(self):
        # Obtener la fecha actual
        fecha_actual = datetime.now()
        print("fecha desde funcion", fecha_actual)
        # Obtener el primer día de la semana actual (lunes)
        primer_dia_semana = fecha_actual - timedelta(days = fecha_actual.weekday())
        primer_dia_semana = primer_dia_semana.replace(hour = 0, minute = 0, second = 0, microsecond = 0)

        # Obtener el último día de la semana actual (viernes)
        ultimo_dia_semana = primer_dia_semana + timedelta(days = 4)
        ultimo_dia_semana = ultimo_dia_semana.replace(hour = 23, minute = 59, second = 59, microsecond = 999999)

        # Calcular la cantidad de días transcurridos en la semana actual
        dias_transcurridos = (fecha_actual - primer_dia_semana).days + 1

            # Obtener la fecha actual
        fecha_actual = datetime.now()

        mes_actual = fecha_actual.month

        # Obtener el primer día del mes actual
        primer_dia_mes = fecha_actual.replace(day=1)

        # Inicializar la cantidad de días transcurridos
        dias_transcurridos_mes = 0

        # Iterar sobre cada día del mes
        for i in range(0, fecha_actual.day):
            # Obtener el día actual en el bucle
            dia_actual = primer_dia_mes + timedelta(days=i)

            # Si el día actual no es sábado ni domingo, aumentar el contador de días transcurridos
            if dia_actual.weekday() < 5:  # Lunes=0, Martes=1, ..., Viernes=4
                dias_transcurridos_mes += 1

        return fecha_actual, primer_dia_semana, ultimo_dia_semana, dias_transcurridos, dias_transcurridos_mes, mes_actual

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

    def cant_ventasX_estado(self, response_data, mes_actual):
        ventas_activas = []
        ventas_temporal = []
        ventas_baja = []
        ventas_firmado = []
        ventas_verificado = []
        ventas_cancelada = []
        ventas_desistimiento = []
        ventas_devuelta = []
        ventas_pendiente = []
        ventas_recuperada = []
        ventas_cumple_calidad = []
        ventas_no_cumple_calidad = []


        for venta in response_data:
            formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "activa":
                ventas_activas.append(venta)

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "temporal":
                ventas_temporal.append(venta)

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "baja":
                ventas_baja.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "firmado":
                ventas_firmado.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "verificado":
                ventas_verificado.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "cancelada":
                ventas_cancelada.append(venta)    

            # Filtro de ventas según el estado "no facturable"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "desistimiento":
                ventas_desistimiento.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "devuelta":
                ventas_devuelta.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "pendiente":
                ventas_pendiente.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "recuperada":
                ventas_recuperada.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "cumple calidad":
                ventas_cumple_calidad.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and formato_fecha.month == mes_actual and venta['estado'] == "no cumple calidad":
                ventas_no_cumple_calidad.append(venta)

        return ventas_activas, ventas_temporal, ventas_baja, ventas_firmado, ventas_verificado, ventas_cancelada, ventas_desistimiento, ventas_devuelta, ventas_pendiente, ventas_recuperada, ventas_cumple_calidad, ventas_no_cumple_calidad
