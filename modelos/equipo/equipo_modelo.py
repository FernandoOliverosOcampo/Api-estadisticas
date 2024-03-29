from config import *
from librerias import *
from modelos.supabase.keys import *
from modelos.generales import *

class Equipo():

    # Rutas
    # Se recibe el nombre, pero, si es capacitacion, cambiará la consulta y buscará por nombre_agente ya que hay usuarios con lider de equipo no asignado.
    # /info-equipo/<lider_equipo>
    def info_equipo(self, lider_equipo):

        try:
            if lider_equipo is None or lider_equipo == "":
                return jsonify({"error" : "campo lider_equipo vacío"}), 401

            if (lider_equipo == "katheryn"):
                nombre_agente = "capacitacion"
                response = supabase.table(tabla_ventas_produccion).select("*").eq('nombre_agente', nombre_agente).order('id.desc').execute()
            else:
                response = supabase.table(tabla_ventas_produccion).select("*").eq('lider_equipo', lider_equipo).order('id.desc').execute()

            response_data = response.data

            # Sacar los datos de las fechas
            fecha_actual, primer_dia_semana, ultimo_dia_semana, dias_transcurridos, dias_transcurridos_mes, mes_actual = self.datos_fecha()

            # Cantidad de ventas según su estado
            ventas_activas, ventas_temporal, ventas_baja, ventas_firmado, ventas_verificado, ventas_cancelada, ventas_desistimiento, ventas_devuelta, ventas_pendiente, ventas_recuperada, ventas_cumple_calidad, ventas_no_cumple_calidad, ventas_no_recuperable = self.cant_ventasX_estado(response_data, mes_actual)

            #Todas las ventas realizadas por el agente
            ventas_realizadas =[]

            #Ventas según el mes
            ventas_enero = []
            ventas_febrero = []
            ventas_marzo = []

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response_data), 1):
                ventas_realizadas.append(response_data[i])

            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes Enero
                if formato_fecha.month == 1:
                    ventas_enero.append(ventas_realizadas[i])

                # Mes Febrero
                if formato_fecha.month == 2:
                    ventas_febrero.append(ventas_realizadas[i])

                # Mes Marzo
                if formato_fecha.month == 3:
                    ventas_marzo.append(ventas_realizadas[i])

            #Finales
                    
            # Obtener las ventas que se realizaron en la semana actual
            ventas_semana_actual = self.ventas_semana_actual(response_data, primer_dia_semana, ultimo_dia_semana)

            total_ventas_mes_actual = len(self.ventas_mes_actual(response_data, mes_actual))

            # En ventas
            cant_ventas = len(response_data)
            cant_ventas_semana = len(ventas_semana_actual)
            cant_ventas_realizadas = len(response_data)
            cant_ventas_febrero = len(ventas_febrero)
            cant_ventas_marzo = len(ventas_marzo)
            cant_ventas_enero = len(ventas_enero)

            # Principales
            prom_venta_semana_actual = round(cant_ventas_semana / dias_transcurridos, 2)
            prom_venta_mes_actual = round(total_ventas_mes_actual / dias_transcurridos_mes, 2)
            prom_ventas_diarias = round(total_ventas_mes_actual / dias_transcurridos_mes, 2)
            
            return jsonify({
                "cant_ventas_totales": cant_ventas,
                "cant_ventas_semana_actual": cant_ventas_semana,
                "cant_ventas_mes_actual": total_ventas_mes_actual,
                "cant_ventas_realizadas" : cant_ventas_realizadas,
                "cant_ventas_enero" : cant_ventas_enero,
                "cant_ventas_febrero" : cant_ventas_febrero,
                "cant_ventas_marzo" : cant_ventas_marzo,
                "prom_venta_semana_actual": prom_venta_semana_actual,
                "prom_venta_mes_actual": prom_venta_mes_actual,
                "prom_ventas_diarias": prom_ventas_diarias,
                "ventas_realizadas": ventas_realizadas,
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
                "ventas_no_cumple_calidad": ventas_no_cumple_calidad,
                "ventas_no_recuperable": ventas_no_recuperable
            })
        
        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Trae todos los agentes pertenecientes a un lider de equipo junto con sus ventas realizadas
    # /agentes-pertenecientes/<lider_equipo>
    def agentes_pertenecientes(self, lider_equipo):

        try:
            if lider_equipo is None or lider_equipo == "":
                return jsonify({"error" : "campo lider_equipo vacío"}), 401

            info_agentes = supabase.table(tabla_agentes_produccion).select("cedula", "apodo", "nombre").eq("lider_equipo", lider_equipo).execute()
            info_ventas_agente = supabase.table(tabla_ventas_produccion).select("nombre_agente", "fecha_ingreso_venta").eq("lider_equipo", lider_equipo).execute()
            #Se guardan todas las ventas que traiga la consulta
            ventas_realizadas = []
            #Se guardan las ventas del mes actual
            ventas_mes_actual = []

            fecha_actual = datetime.now()
            mes_actual = fecha_actual.month

            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(info_ventas_agente.data), 1):
                ventas_realizadas.append(info_ventas_agente.data[i])

             #Filtrar ventas del mes en curso
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes Febrero
                if formato_fecha.month == mes_actual:
                    ventas_mes_actual.append(ventas_realizadas[i])

            # Contar la frecuencia de cada nombre de agente
            frecuencia_nombres = Counter(agente['nombre_agente'] for agente in ventas_mes_actual)
            
            agentes = []
            for i in range(0, len(info_agentes.data), 1):
                agentes.append(info_agentes.data[i])

            # Crear una nueva lista que combine la información de los agentes y sus frecuencias
            resultado_combinado = []

            for info_agente in agentes:
                apodo = info_agente['apodo']
                frecuencia = frecuencia_nombres.get(apodo, 0)  # Obtener la frecuencia, si no existe es 0
                info_agente['ventas_mes_actual'] = frecuencia
                resultado_combinado.append(info_agente)
            
            return jsonify({"agentes_pertenecientes": resultado_combinado}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500 
        
    # Trae todos los agentes pertenecientes a un lider de equipo junto con sus ventas realizadas
    # /lista-agentes/<lider_equipo>
    def lista_agentes(self, lider_equipo):
        try:
            if lider_equipo is None or lider_equipo == "":
                return jsonify({"error" : "campo lider_equipo vacío"}), 401

            info_agentes = supabase.table(tabla_agentes_produccion).select("*").eq("lider_equipo", lider_equipo).order('id_agente.desc').execute()
            cant_usuarios = len(info_agentes.data)
            return jsonify({"lista_agentes": info_agentes.data, "cant_usuarios": cant_usuarios}), 200
        
        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500 
        
    # Trae todos los agentes pertenecientes a un lider de equipo junto con sus ventas realizadas
    # /traer-usuarios/
    def traer_usuarios(self):
        try:

            usuarios = supabase.table(tabla_agentes_produccion).select("*").order('id_agente.desc').execute()
            cant_usuarios = len(usuarios.data)
            return jsonify({"usuarios": usuarios.data, "cant_usuarios": cant_usuarios}), 200
        
        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500 

    # Funciones
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
        ventas_no_recuperable = []


        for venta in response_data:
            formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and venta['estado'] == "activa":
                ventas_activas.append(venta)

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "temporal":
                ventas_temporal.append(venta)

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "baja":
                ventas_baja.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "firmado":
                ventas_firmado.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "verificado":
                ventas_verificado.append(venta)    

            # Filtro de ventas según el estado "activa"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "cancelada":
                ventas_cancelada.append(venta)    

            # Filtro de ventas según el estado "no facturable"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "desistimiento":
                ventas_desistimiento.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "devuelta":
                ventas_devuelta.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "pendiente":
                ventas_pendiente.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "recuperada":
                ventas_recuperada.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "cumple calidad":
                ventas_cumple_calidad.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "no cumple calidad":
                ventas_no_cumple_calidad.append(venta)

            # Filtro de ventas según el estado "pendiente"
            if formato_fecha.year == 2024 and  formato_fecha.month == mes_actual and  venta['estado'] == "no recuperable":
                ventas_no_recuperable.append(venta)

        return ventas_activas, ventas_temporal, ventas_baja, ventas_firmado, ventas_verificado, ventas_cancelada, ventas_desistimiento, ventas_devuelta, ventas_pendiente, ventas_recuperada, ventas_cumple_calidad, ventas_no_cumple_calidad, ventas_no_recuperable

    def ventas_semana_actual(self, response_data, primer_dia_semana, ultimo_dia_semana):
        # Filtro de ventas según la semana actual
        ventas_semana_actual = []

        for venta in response_data:
            formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")
            # Verificar si la venta ocurrió dentro de la semana actual
            if primer_dia_semana <= formato_fecha <= ultimo_dia_semana:
                ventas_semana_actual.append(venta)

        return ventas_semana_actual

    def ventas_mes_actual(self, response_data, mes_actual):

        ventas_realizadas = []
        ventas_mes_actual = []

        #Las ventas totales que ha realizado el asesor
        for i in range(0, len(response_data), 1):
            ventas_realizadas.append(response_data[i])

                #Filtro de ventas según los meses
        for i in range(0, len(ventas_realizadas), 1):
            formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

            # Mes diciembre
            if formato_fecha.month == mes_actual:
                ventas_mes_actual.append(ventas_realizadas[i])

        return ventas_mes_actual

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


