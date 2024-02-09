from config import *
from librerias import *
from modelos.supabase.keys import *
from datetime import datetime

class Venta():


    def descargar_ventas_realizadas(self):
            try:
                supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

                csv_filename= '/home/equitisoporte/Api-estadisticas/ventas_realizadas.csv'

                response_data = supabase.table('VENTAS_REALIZADAS').select("*").gt('id', '500').execute()

                # Obtener los datos de la respuesta
                ventas_data = response_data.data

                # Crear un DataFrame de Pandas
                df_ventas = pd.DataFrame(ventas_data)

                # Exportar el DataFrame a un archivo CSV
                df_ventas.to_csv(csv_filename, index=False)

                # Ruta al archivo CSV exportado
                archivo_csv = '/home/equitisoporte/Api-estadisticas/ventas_realizadas.csv'

                # Descargar el archivo CSV
                return send_file(archivo_csv, as_attachment=True)
                    
            except requests.exceptions.HTTPError as err:
                print(err)
                return 201

    def mostrar_todas_ventas_realizadas(self):
        try:
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            response_data = supabase.table('VENTAS_REALIZADAS').select("*").gt('id','1000').order('id.desc').execute()

            return jsonify({
                "ventas": response_data.data
            })
        except requests.exceptions.HTTPError as err:
            print(err)
            return 201
        
    def mostrar_ventas_realizadas(self, cedula):
            
        try:

            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?cedula=eq.{cedula}',
                                    headers = headers)
            response_data = json.loads(response.text)

            #Todas las ventas realizadas por el agente
            ventas_realizadas =[]

            #Ventas según el mes
            ventas_noviembre = []
            ventas_diciembre = []
            ventas_enero = []
            ventas_febrero = []


            #Las ventas totales que ha realizado el asesor
            for i in range(0, len(response_data), 1):
                ventas_realizadas.append(response_data[i])
                
            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                # Mes noviembre
                if formato_fecha.month == 11:   
                    ventas_noviembre.append(ventas_realizadas[i])

                # Mes diciembre
                if formato_fecha.month == 12:
                    ventas_diciembre.append(ventas_realizadas[i])

                # Mes Enero
                if formato_fecha.month == 1:
                    ventas_enero.append(ventas_realizadas[i])

                # Mes Febrero
                if formato_fecha.month == 2:
                    ventas_febrero.append(ventas_realizadas[i])

            cant_ventas_totales_realizadas = len(ventas_realizadas)
            cant_ventas_totales_noviembre = len(ventas_noviembre)
            cant_ventas_totales_diciembre = len(ventas_diciembre)
            cant_ventas_totales_enero = len(ventas_enero)
            cant_ventas_totales_febrero = len(ventas_febrero)

            return jsonify({
                            "ventas_realizadas": ventas_realizadas,
                            "cant_ventas_realizadas": cant_ventas_totales_realizadas,
                            "ventas_febrero": ventas_febrero,
                            "cant_ventas_febrero": cant_ventas_totales_febrero,
                            "ventas_noviembre": ventas_noviembre,
                            "cant_ventas_noviembre": cant_ventas_totales_noviembre,
                            "ventas_diciembre": ventas_diciembre,
                            "cant_ventas_diciembre": cant_ventas_totales_diciembre,
                            "ventas_enero" : ventas_enero,
                            "cant_ventas_enero": cant_ventas_totales_enero
                            })
        
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def mostrar_estado_ventas(self):
        try:
            cedula = request.json.get('cedula')
            estado_venta = request.json.get('estado_venta')

            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?cedula=eq.{cedula}&estado=eq.{estado_venta}',
                                    headers = headers)
            ventas_realizadas = json.loads(response.text)        

            return jsonify({
                "estado_ventas": ventas_realizadas
            })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201 

    def ventas_semana_actual(self, cedula):
        try:
            print("ejecutando esta")
            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?cedula=eq.{cedula}',
                                    headers = headers)
            response_data = json.loads(response.text)


            # Obtener la fecha actual
            fecha_actual = datetime.now()
            # Obtener el primer día de la semana actual (lunes)
            primer_dia_semana = fecha_actual - timedelta(days=fecha_actual.weekday())
            # Obtener el último día de la semana actual (domingo)
            ultimo_dia_semana = primer_dia_semana + timedelta(days=6)

            # Filtro de ventas según la semana actual
            ventas_semana_actual = []

            for venta in response_data:
                formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")

                # Verificar si la venta ocurrió dentro de la semana actual
                if primer_dia_semana <= formato_fecha <= ultimo_dia_semana:
                        ventas_semana_actual.append(venta)
            
            return jsonify({
                "semana_actual": ventas_semana_actual
            })


        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
    
    def mostrar_ventas_mes_especifico(self):
        try:

            cedula = request.json.get('cedula')
            mes = request.json.get('mes')
            year = request.json.get('year')

            response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS?cedula=eq.{cedula}',
                                    headers = headers)
            ventas_realizadas = json.loads(response.text)

            venta_mes_especifico = []

            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                if formato_fecha.year == int(year) and formato_fecha.month == int(mes):   
                    venta_mes_especifico.append(ventas_realizadas[i])

            return jsonify({
                "mostrar_ventas_mes_especifico": venta_mes_especifico
            })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201 

    def registrar_venta(self):

        try:
            marca_temporal = request.json.get('marca_temporal')
            compania = request.json.get('compania')
            fecha_ingreso_venta = request.json.get('fecha_ingreso_venta')
            nombre = request.json.get('nombre')
            dni = request.json.get('dni')
            telefono = request.json.get('telefono')
            correo = request.json.get('correo')
            direccion = request.json.get('direccion')
            fecha_nacimiento = request.json.get('fecha_nacimiento')
            cups_luz = request.json.get('cups_luz')
            cups_gas = request.json.get('cups_gas')
            iban = request.json.get('iban')
            base_de_datos = request.json.get('base_de_datos')
            numero_contrato = request.json.get('numero_contrato')
            potencia = request.json.get('potencia')
            peaje_gas = request.json.get('peaje_gas')
            observaciones_venta = request.json.get('observaciones_venta')
            verificacion_calidad = request.json.get('verificacion_calidad')
            responsable_calidad = request.json.get('responsable_calidad')
            llamada_calidad = request.json.get('llamada_calidad')
            calidad_enviada = request.json.get('calidad_enviada')
            observaciones_calidad = request.json.get('observaciones_calidad')
            lider_responsable = request.json.get('lider_responsable')
            audios_cargados = request.json.get('audios_cargados')
            estado = request.json.get('estado')
            observaciones_adicionales = request.json.get('observaciones_adicionales')
            cedula = request.json.get('cedula')
            lider_equipo = request.json.get('lider_equipo')
            nombre_agente = request.json.get('nombre_agente')
            mantenimiento = request.json.get('mantenimiento')
            tipo_mantenimiento = request.json.get('tipo_mantenimiento')
            legalizacion = request.json.get('legalizacion')
            
            datos_js = {
                "marca_temporal": marca_temporal,
                "compania": compania,
                "fecha_ingreso_venta": fecha_ingreso_venta,
                "nombre": nombre,
                "dni": dni,
                "telefono": telefono,
                "correo": correo,
                "direccion": direccion,
                "fecha_nacimiento": fecha_nacimiento,
                "cups_luz": cups_luz,
                "cups_gas": cups_gas,
                "iban": iban,
                "nombre_agente": nombre_agente,
                "base_de_datos": base_de_datos,
                "numero_contrato": numero_contrato,
                "potencia": potencia,
                "peaje_gas": peaje_gas,
                "observaciones_venta": observaciones_venta,
                "verificacion_calidad": verificacion_calidad,
                "responsable_calidad": responsable_calidad,
                "llamada_calidad": llamada_calidad,
                "calidad_enviada": calidad_enviada,
                "observaciones_calidad": observaciones_calidad,
                "lider_responsable": lider_responsable,
                "audios_cargados": audios_cargados,
                "estado": estado,
                "observaciones_adicionales": observaciones_adicionales ,
                "cedula": cedula,
                "lider_equipo": lider_equipo,
                "mantenimiento": mantenimiento,
                "tipo_mantenimiento": tipo_mantenimiento,
                "legalizacion": legalizacion
            }

            datos_recordatorio = json.dumps(datos_js)
            
            print(datos_recordatorio)

            response = requests.post(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS',
                                    data = datos_recordatorio,
                                    headers = headers)
            print(response)
            return jsonify({"prubea": "xd"})

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def editar_venta(self):

        try:
             
            data_dict = {
                "compania": request.json.get('compania'),
                "nombre": request.json.get('nombre'),
                "dni": request.json.get('dni'),
                "telefono": request.json.get('telefono'),
                "correo": request.json.get('correo'),
                "direccion": request.json.get('direccion'),
                "fecha_nacimiento": request.json.get('fecha_nacimiento'),
                "cups_luz": request.json.get('cups_luz'),
                "cups_gas": request.json.get('cups_gas'),
                "iban": request.json.get('iban'),
                "numero_contrato": request.json.get('numero_contrato'),
                "potencia": request.json.get('potencia'),
                "peaje_gas": request.json.get('peaje_gas'),
                "verificacion_calidad": request.json.get('verificacion_calidad'),
                "llamada_calidad": request.json.get('llamada_calidad'),
                "calidad_enviada": request.json.get('calidad_enviada'),
                "observaciones_calidad": request.json.get('observaciones_calidad'),
                "observaciones_venta": request.json.get('observaciones_venta'),
                "audios_cargados": request.json.get('audios_cargados'),
                "estado": request.json.get('estado'),
                "observaciones_adicionales": request.json.get('observaciones_adicionales'),
                "legalizacion": request.json.get('legalizacion')
            }

            id_venta = request.json.get('id_venta')
            #datos_recordatorio = json.dumps(data_dict)

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            response_data = supabase.table('VENTAS_REALIZADAS').update(data_dict).eq('id', id_venta).execute()
             
            return jsonify({"Compañia": "compania"})
        
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
    
    def editar_venta_calidad(self):

        try:
             
            data_dict = {
                "verificacion_calidad": request.json.get('verificacion_calidad'),
                "llamada_calidad": request.json.get('llamada_calidad'),
                "calidad_enviada": request.json.get('calidad_enviada'),
                "observaciones_calidad": request.json.get('observaciones_calidad'),
                "observaciones_venta": request.json.get('observaciones_venta'),
                "audios_cargados": request.json.get('audios_cargados'),
                "observaciones_adicionales": request.json.get('observaciones_adicionales'),
                "legalizacion": request.json.get('legalizacion')
            }

            id_venta = request.json.get('id_venta')
            #datos_recordatorio = json.dumps(data_dict)

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            response_data = supabase.table('VENTAS_REALIZADAS').update(data_dict).eq('id', id_venta).execute()
             
            return jsonify({"Compañia": "compania"})
        
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201
    
    def editar_estado_venta(self):

        try:
             
            data_dict = {
                "estado": request.json.get('estado'),
            }

            id_venta = request.json.get('id_venta')
            #datos_recordatorio = json.dumps(data_dict)

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            response_data = supabase.table('VENTAS_REALIZADAS').update(data_dict).eq('id', id_venta).execute()
             
            return jsonify({"Compañia": "compania"})
        
        except requests.exceptions.HTTPError as err:
                print(err)
        return 201