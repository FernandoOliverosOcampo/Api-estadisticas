from librerias import *
from modelos.supabase.keys import *
from datetime import datetime
from modelos.generales import *

class Venta():

    def descargar_ventas_intervalo_fecha(self):

        try:

            fecha_inicial_str = request.json.get("fecha_inicial")
            fecha_final_str = request.json.get("fecha_final")

            # Validación de datos de entrada
            if not fecha_inicial_str or not fecha_final_str:
                return jsonify({"error": "Las fechas de inicio y fin son requeridas"}), 400

            # Convertir cadenas de fecha en objetos de fecha
            fecha_inicial = datetime.strptime(fecha_inicial_str, '%d/%m/%Y')
            fecha_final = datetime.strptime(fecha_final_str, '%d/%m/%Y')

            # Formateo y union de fechas
            dia_inicial = fecha_inicial.day
            mes_inicial = fecha_inicial.month
            mes_inicial_formateado = self.detectar_mes(str(mes_inicial))

            dia_final = fecha_final.day
            mes_final = fecha_final.month
            mes_final_formateado = self.detectar_mes(str(mes_final))

            # Fechas finales
            fecha_inicial_nombre = f'{dia_inicial}{mes_inicial_formateado}'
            fecha_final_nombre = f'{dia_final}{mes_final_formateado}'

            # Realizar la consulta a Supabase
            response = supabase.table(tabla_ventas_produccion).select("*").order('id.desc').execute()

            # Filtrar las ventas en el intervalo de fechas y que pertenezcan al mismo mes y año
            ventas_en_intervalo = [
                venta for venta in response.data
                if (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_inicial.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_inicial.year
                ) or (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_final.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_final.year
                )
            ]

            csv_filename = f'./ventas_realizadas del {fecha_inicial_nombre} al {fecha_final_nombre}.csv'
            #csv_filename = f'/home/equitisoporte/Api-estadisticas/ventas_realizadas del {fecha_inicial_nombre} al {fecha_final_nombre}.csv'
            # Crear un DataFrame de Pandas
            df_ventas = pd.DataFrame(ventas_en_intervalo)

            # Exportar el DataFrame a un archivo CSV
            df_ventas.to_csv(csv_filename, index = False)

            # Ruta al archivo CSV exportado
            archivo_csv = f'./ventas_realizadas del {fecha_inicial_nombre} al {fecha_final_nombre}.csv'
            # f'/home/equitisoporte/Api-estadisticas/ventas_realizadas del {fecha_inicial_nombre} al {fecha_final_nombre}.csv'
            # Descargar el archivo CSV
            return send_file(archivo_csv, as_attachment = True), 200

        except Exception as e:
            print(e)
            return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

    # Descarga todas las ventas con id's mayor a 1000
    # /descargar-ventas/
    def descargar_ventas_realizadas(self):

        try:
            csv_filename= '/home/equitisoporte/Api-estadisticas/ventas_realizadas.csv'
            #csv_filename = 'ventas_realizadas.csv'
            response = supabase.table(tabla_ventas_produccion).select("*").gt('id', cant_ventas_mostrar).execute()

            if (len(response.data) == 0):
                return jsonify({"res" : "No existen ventas en esta tabla"}), 200

            # Obtener los datos de la respuesta
            ventas_data = response.data

            # Crear un DataFrame de Pandas
            df_ventas = pd.DataFrame(ventas_data)

            # Exportar el DataFrame a un archivo CSV
            df_ventas.to_csv(csv_filename, index=False)

            # Ruta al archivo CSV exportado
            archivo_csv = './ventas_realizadas.csv'

            # Descargar el archivo CSV
            return send_file(archivo_csv, as_attachment = True), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Muestra todas los registros de la tabla de VENTAS_REALIZADAS
    # /mostrar-ventas/
    def mostrar_todas_ventas_realizadas(self):

        try:
            response = supabase.table(tabla_ventas_produccion).select("*").gt('id', 1500).order('id.desc').execute()

            if (len(response.data) == 0):
                return jsonify({"res" : "No hay registros en esta tabla"}), 200

            else:

                return jsonify({
                    "ventas": response.data
                }), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Muesstra todos las ventas relacionados a un agente con su cédula
    # /mostrar-ventas-realizadas/<cedula>
    def mostrar_ventas_realizadas(self, cedula):

        try:
            response = supabase.table(tabla_ventas_produccion).select("*").eq('cedula', cedula).order('id.desc').execute()

            if (len(response.data) == 0):
                return jsonify({"mostrar_ventas_realizadas_agente_status" : "No existe la cedula o no ha realizado ventas"})

            response_data = response.data

            #Todas las ventas realizadas por el agente
            ventas_realizadas =[]

            #Ventas según el mes
            ventas_diciembre = []
            ventas_enero = []
            ventas_febrero = []
            ventas_marzo = []


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

                # Mes marzo
                if formato_fecha.month == 3:
                    ventas_marzo.append(ventas_realizadas[i])

            cant_ventas_totales_realizadas = len(ventas_realizadas)
            cant_ventas_totales_marzo = len(ventas_marzo)
            cant_ventas_totales_diciembre = len(ventas_diciembre)
            cant_ventas_totales_enero = len(ventas_enero)
            cant_ventas_totales_febrero = len(ventas_febrero)

            return jsonify({
                            "ventas_realizadas": ventas_realizadas,
                            "cant_ventas_realizadas": cant_ventas_totales_realizadas,
                            "ventas_febrero": ventas_febrero,
                            "cant_ventas_febrero": cant_ventas_totales_febrero,
                            "ventas_marzo": ventas_marzo,
                            "cant_ventas_marzo": cant_ventas_totales_marzo,
                            "ventas_diciembre": ventas_diciembre,
                            "cant_ventas_diciembre": cant_ventas_totales_diciembre,
                            "ventas_enero" : ventas_enero,
                            "cant_ventas_enero": cant_ventas_totales_enero
                            })

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Registra los datos de una venta
    # /registrar-venta/
    def registrar_venta(self):

        try:
            datos_dict = {
                "marca_temporal": request.json.get('marca_temporal'),
                "compania": request.json.get('compania'),
                "fecha_ingreso_venta": request.json.get('fecha_ingreso_venta'),
                "nombre": request.json.get('nombre'),
                "dni": request.json.get('dni'),
                "telefono": request.json.get('telefono'),
                "telefono_fijo": request.json.get('telefono_fijo'),
                "correo": request.json.get('correo'),
                "direccion": request.json.get('direccion'),
                "fecha_nacimiento": request.json.get('fecha_nacimiento'),
                "cups_luz": request.json.get('cups_luz'),
                "cups_gas": request.json.get('cups_gas'),
                "iban": request.json.get('iban'),
                "nombre_agente": request.json.get('nombre_agente'),
                "base_de_datos": request.json.get('base_de_datos'),
                "numero_contrato": request.json.get('numero_contrato'),
                "potencia": request.json.get('potencia'),
                "peaje_gas": request.json.get('peaje_gas'),
                "observaciones_venta": request.json.get('observaciones_venta'),
                "verificacion_calidad": request.json.get('verificacion_calidad'),
                "responsable_calidad": request.json.get('responsable_calidad'),
                "llamada_calidad": request.json.get('llamada_calidad'),
                "calidad_enviada": request.json.get('calidad_enviada'),
                "observaciones_calidad": request.json.get('observaciones_calidad'),
                "lider_responsable": request.json.get('lider_responsable'),
                "audios_cargados": request.json.get('audios_cargados'),
                "estado": request.json.get('estado'),
                "observaciones_adicionales":request.json.get('observaciones_adicionales'),
                "cedula": request.json.get('cedula'),
                "lider_equipo": request.json.get('lider_equipo'),
                "mantenimiento": request.json.get('mantenimiento'),
                "tipo_mantenimiento": request.json.get('tipo_mantenimiento'),
                "legalizacion": request.json.get('legalizacion'),
            }

            cedula = request.json.get('cedula')

            # Datos del usuario que hace la acción (agrega un registro)
            datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
            usuario = datos_usuario.data[0]['usuario']

            # Comprobación de que no estén vacios los campos
            campos_vacios = diccionario_vacio(datos_dict)
            if campos_vacios:
                return jsonify({"registrar_venta_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400

            else:
                # Se ingresa la venta
                res = supabase.table(tabla_ventas_produccion).insert(datos_dict).execute()

                # Luego de insertar el registro, se saca el ID (de la venta creda) que devuelve la respuesta de la petición
                id_venta = res.data[0]['id']
                guardar_historial('VENTAS_REALIZADAS', id_venta, "nueva venta", usuario, datos_dict)

                return jsonify({"insertar_venta_status": "OK"}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Edita la información de la venta desde el usuario admin y reportes
    # /editar-venta/
    def editar_venta(self):

        try:
            data_dict = {
                "compania": request.json.get('compania'),
                "nombre": request.json.get('nombre'),
                "dni": request.json.get('dni'),
                "telefono": request.json.get('telefono'),
                "telefono_fijo": request.json.get('telefono_fijo'),
                "correo": request.json.get('correo'),
                "direccion": request.json.get('direccion'),
                "fecha_nacimiento": request.json.get('fecha_nacimiento'),
                "cups_luz": request.json.get('cups_luz'),
                "cups_gas": request.json.get('cups_gas'),
                "iban": request.json.get('iban'),
                "numero_contrato": request.json.get('numero_contrato'),
                "potencia": request.json.get('potencia'),
                "peaje_gas": request.json.get('peaje_gas'),
                "tipo_mantenimiento": request.json.get('tipo_mantenimiento'),
                "verificacion_calidad": request.json.get('verificacion_calidad'),
                "llamada_calidad": request.json.get('llamada_calidad'),
                "calidad_enviada": request.json.get('calidad_enviada'),
                "observaciones_calidad": request.json.get('observaciones_calidad'),
                "audios_cargados": request.json.get('audios_cargados'),
                "estado": request.json.get('estado'),
                "observaciones_adicionales": request.json.get('observaciones_adicionales'),
                "legalizacion": request.json.get('legalizacion')
            }

            id_venta = request.json.get('id_venta')
            cedula = request.json.get('cedula_usuario')

            campos_vacios = diccionario_vacio(data_dict)

            if campos_vacios:
                return jsonify({"editar_venta_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400

            else:
                # Datos del usuario que hace la acción (actualizar el estado de la venta)
                datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
                usuario = datos_usuario.data[0]['usuario']

                # Datos de la venta antes de actualizarla
                # AGREGAR TELEFONO FIJO
                datos_venta_actualizar = supabase.table(tabla_ventas_produccion).select("compania", "nombre", "dni", "telefono", "telefono_fijo", "correo", "direccion", 
                "fecha_nacimiento", "cups_luz", "cups_gas", "iban", "numero_contrato", 
                "potencia", "peaje_gas", "tipo_mantenimiento", "verificacion_calidad", "llamada_calidad", 
                "calidad_enviada", "observaciones_calidad", "audios_cargados", 
                "estado", "observaciones_adicionales", "legalizacion").eq('id', id_venta).execute()

                # Registro final de los datos nuevos vs los datos anteriores
                registro_anterior = datos_venta_actualizar.data
                registro_nuevo = data_dict

                # JSON con los cambios detectados
                cambios = comparar_informacion(registro_anterior, registro_nuevo)

                supabase.table(tabla_ventas_produccion).update(data_dict).eq('id', id_venta).execute()
                guardar_historial('VENTAS_REALIZADAS', id_venta, "actualizacion de venta", usuario, cambios)

                return jsonify({"editar_venta_status": "OK"}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Edita la información de la venta desde el usuario calidad
    # /editar-venta-calidad/
    def editar_venta_calidad(self):

        try:
            data_dict = {
                "verificacion_calidad": request.json.get('verificacion_calidad'),
                "llamada_calidad": request.json.get('llamada_calidad'),
                "calidad_enviada": request.json.get('calidad_enviada'),
                "observaciones_calidad": request.json.get('observaciones_calidad'),
                "audios_cargados": request.json.get('audios_cargados'),
                "legalizacion": request.json.get('legalizacion'),
                "estado": request.json.get('estado')
            }

            id_venta = request.json.get('id_venta')
            cedula = request.json.get('cedula_usuario')

            campos_vacios = diccionario_vacio(data_dict)

            if campos_vacios:
                return jsonify({"editar_venta_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400

            else:
                # Datos del usuario que hace la acción (actualizar el estado de la venta)
                datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
                usuario = datos_usuario.data[0]['usuario']

                # Datos de la venta antes de actualizarla
                datos_venta_actualizar = supabase.table(tabla_ventas_produccion).select("audios_cargados", "legalizacion", "estado", "verificacion_calidad", "llamada_calidad", "calidad_enviada", "observaciones_calidad", ).eq('id', id_venta).execute()

                # Registro final de los datos nuevos vs los datos anteriores
                registro_anterior = datos_venta_actualizar.data
                registro_nuevo = data_dict

                # JSON con los cambios detectados
                cambios = comparar_informacion(registro_anterior, registro_nuevo)

                supabase.table(tabla_ventas_produccion).update(data_dict).eq('id', id_venta).execute()
                guardar_historial('VENTAS_REALIZADAS', id_venta, "actualizacion de venta", usuario, cambios)

                return jsonify({"editar_venta_calidad": "OK"}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Edita el estado de una venta (desde la tabla)
    # /editar-venta-estado/
    def editar_estado_venta(self):

        try:
            data_dict = {
                "estado": request.json.get('estado'),
            }

            id_venta = request.json.get('id_venta')
            cedula = request.json.get('cedula_usuario')

            # Datos del usuario que hace la acción (actualizar el estado de la venta)
            datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
            usuario = datos_usuario.data[0]['usuario']

            # Datos de la venta antes de actualizarla
            datos_venta_actualizar = supabase.table(tabla_ventas_produccion).select("estado").eq('id', id_venta).execute()

            # Registro final de los datos nuevos vs los datos anteriores
            registro_anterior = datos_venta_actualizar.data
            registro_nuevo = data_dict

            # JSON con los cambios detectados
            cambios = comparar_informacion(registro_anterior, registro_nuevo)

            supabase.table(tabla_ventas_produccion).update(data_dict).eq('id', id_venta).execute()
            guardar_historial('VENTAS_REALIZADAS', id_venta, "actualizacion de estado", usuario, cambios)

            return jsonify({"actualizar_estado_venta": "OK"})

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Elimina un registro desde su id
    # /eliminar-venta/<id>
    def eliminar_venta(self):

        try:
            id_venta = request.json.get('id_venta')
            cedula = request.json.get('cedula_usuario')

            # Datos de la venta antes de eliminarla
            datos_venta_eliminar = supabase.table(tabla_ventas_produccion).select("compania", "nombre", "dni", "telefono", "telefono_fijo", "correo", "direccion", 
            "fecha_nacimiento", "cups_luz", "cups_gas", "iban", "numero_contrato", 
            "potencia", "peaje_gas", "tipo_mantenimiento", "verificacion_calidad", "llamada_calidad", 
            "calidad_enviada", "observaciones_calidad", "audios_cargados", 
            "estado", "observaciones_adicionales", "legalizacion").eq('id', id_venta).execute()
            cambios = datos_venta_eliminar.data[0]
            
            # Comprobación de que la ID de la venta exista
            if len(datos_venta_eliminar.data) == 0:
                return jsonify({"eliminacion_venta_status": "error", "mensaje": "ese id de venta no existe"}), 200

            else:
                # Datos del usuario que hace la acción (elimina el registro)
                datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
                usuario = datos_usuario.data[0]['usuario']

                supabase.table(tabla_ventas_produccion).delete().eq('id', id_venta).execute()
                guardar_historial('VENTAS_REALIZADAS', id_venta, "eliminacion de venta", usuario, cambios)
                
                return jsonify({"eliminacion_venta_status": "OK"}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Edita el estado y observaciones adicionales desde el usuario team_leader
    # /editar-venta-team-leader/
    def editar_venta_team_leader(self):

        try:
            data_dict ={
                "estado": request.json.get('estado'),
                "observaciones_adicionales": request.json.get('observaciones_adicionales')
            }

            id_venta = request.json.get('id_venta')
            cedula = request.json.get('cedula_usuario')

            campos_vacios = diccionario_vacio(data_dict)

            if campos_vacios:
                return jsonify({"editar_venta_team_leader_status": "existen campos vacios", "campos_vacios": campos_vacios}), 400
            
            # Datos del usuario que hace la acción (elimina el registro)
            datos_usuario = supabase.table(tabla_agentes_produccion).select('*').eq('cedula', cedula).execute()
            usuario = datos_usuario.data[0]['usuario']

            #Consultar el registro original
            response = supabase.table(tabla_ventas_produccion).select("estado", "observaciones_adicionales").eq('id', id_venta).execute()

            registro_anterior = response.data
            registro_nuevo = data_dict

            # JSON con los cambios detectados
            cambios = comparar_informacion(registro_anterior, registro_nuevo)

            supabase.table(tabla_ventas_produccion).update(data_dict).eq('id', id_venta).execute()
            guardar_historial('VENTAS_REALIZADAS', id_venta, "actualizacion de venta", usuario, cambios)

            return jsonify({"editar_venta_team_leader_status": "OK"})


        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Muestra los ventas para una fecha en específico
    # /mostrar-por-fecha/
    def mostrar_venta_por_fecha(self):

        try:

            fecha = request.json.get("fecha_venta")

            if fecha is None or fecha == "":
                return jsonify({"editar_venta_team_leader_status": "existen campos vacios", "campos_vacios": fecha}), 400

            response = supabase.table(tabla_ventas_produccion).select("*").eq("fecha_ingreso_venta", fecha).order('id.desc').execute()

            return jsonify({"ventas": response.data}), 200

        except requests.exceptions.HTTPError as err:
             print(err)
        return 201

    # Muestra los ventas para una fecha en específico
    # /mostrar-por-fecha-leader/
    def mostrar_venta_por_fecha_team_leader(self):

        try:
            leader = request.json.get("lider_equipo")
            fecha = request.json.get("fecha_venta")

            if fecha is None or fecha == "":
                return jsonify({"editar_venta_team_leader_status": "existen campos vacios", "campos_vacios": fecha}), 400

            response = supabase.table(tabla_ventas_produccion).select("*").eq("fecha_ingreso_venta", fecha).eq("lider_equipo", leader).order('id.desc').execute()

            return jsonify({"ventas": response.data}), 200

        except requests.exceptions.HTTPError as err:
             print(err)
        return 201

    # Muestra las ventas por un estado especifico
    # /mostrar-por-estado/
    def mostrar_venta_por_estado(self):

        try:
            estado = request.json.get("estado")

            if estado is None or estado == "":
                return jsonify({"editar_venta_team_leader_status": "existen campos vacios", "campos_vacios": estado}), 400

            response = supabase.table(tabla_ventas_produccion).select("*").eq("estado", estado).order('id.desc').execute()

            return jsonify({"ventas": response.data}), 200

        except requests.exceptions.HTTPError as err:
             print(err)
        return 201

    # Filtra las columnas de la tabla ( en general )
    # /filtrar-tabla/
    def filtrar_tabla(self):

        try:
            columna_buscar = request.json.get("columna_buscar")
            texto_buscar = request.json.get("texto_buscar")

            response = supabase.table(tabla_ventas_produccion).select("*").eq(columna_buscar, texto_buscar).order('id.desc').execute()

            return jsonify({"ventas": response.data}), 200

        except requests.exceptions.HTTPError as err:
             print(err)
        return 201

    # Filtra las columnas de la tabla pero para el team leader
    #/filtrar-tabla-leader/
    def filtrar_tabla_leader(self):

        try:
            leader_buscar = request.json.get("lider_equipo")
            columna_buscar = request.json.get("columna_buscar")
            texto_buscar = request.json.get("texto_buscar")

            response = supabase.table(tabla_ventas_produccion).select("*").eq(columna_buscar, texto_buscar).eq('lider_equipo', leader_buscar).order('id.desc').execute()

            return jsonify({"ventas": response.data}), 200

        except requests.exceptions.HTTPError as err:
             print(err)
        return 201

    # Filtra la tabla de administrador según un intervalo de fechas
    # /mostrar-por-intervalo/
    def mostrar_venta_por_intervalo(self):
        try:
            fecha_inicial_str = request.json.get("fecha_inicial")
            fecha_final_str = request.json.get("fecha_final")

            # Validación de datos de entrada
            if not fecha_inicial_str or not fecha_final_str:
                return jsonify({"error": "Las fechas de inicio y fin son requeridas"}), 400

            # Convertir cadenas de fecha en objetos de fecha
            fecha_inicial = datetime.strptime(fecha_inicial_str, '%d/%m/%Y')
            fecha_final = datetime.strptime(fecha_final_str, '%d/%m/%Y')

            print(fecha_inicial)
            print(fecha_final)

            # Realizar la consulta a Supabase
            response = supabase.table(tabla_ventas_produccion).select("*").order('id.desc').execute()

            # Filtrar las ventas en el intervalo de fechas y que pertenezcan al mismo mes y año
            ventas_en_intervalo = [
                venta for venta in response.data
                if (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_inicial.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_inicial.year
                ) or (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_final.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_final.year
                )
            ]
            # Devolver los resultados de la consulta
            return jsonify({"ventas": ventas_en_intervalo}), 200

        except Exception as e:
            return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

    # Filtra la tabla de administrador según un intervalo de fechas
    # /mostrar-por-intervalo-leader/
    def mostrar_venta_por_intervalo_leader(self):
        try:
            lider_equipo = request.json.get("lider_equipo")
            fecha_inicial_str = request.json.get("fecha_inicial")
            fecha_final_str = request.json.get("fecha_final")

            # Validación de datos de entrada
            if not fecha_inicial_str or not fecha_final_str:
                return jsonify({"error": "Las fechas de inicio y fin son requeridas"}), 400

            # Convertir cadenas de fecha en objetos de fecha
            fecha_inicial = datetime.strptime(fecha_inicial_str, '%d/%m/%Y')
            fecha_final = datetime.strptime(fecha_final_str, '%d/%m/%Y')

            # Realizar la consulta a Supabase
            response = supabase.table(tabla_ventas_produccion).select("*").eq('lider_equipo', lider_equipo).order('id.desc').execute()
            # Filtrar las ventas en el intervalo de fechas y que pertenezcan al mismo mes y año
            ventas_en_intervalo = [
                venta for venta in response.data
                if (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_inicial.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_inicial.year
                ) or (
                    fecha_inicial <= datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y') <= fecha_final
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').month == fecha_final.month
                    and datetime.strptime(venta['fecha_ingreso_venta'], '%d/%m/%Y').year == fecha_final.year
                )
            ]
            # Devolver los resultados de la consulta
            return jsonify({"ventas": ventas_en_intervalo}), 200

        except Exception as e:
            return jsonify({"error": "Ocurrió un error al procesar la solicitud"}), 500

    # Muestra las estadisticas generales relacionadas a las ventas del dia actual
    # /estadisticas-venta-dia/
    def estadisticas_venta_dia(self):

        try:
            fecha_sistema = datetime.now()
            meses = [1,2,3,4,5,6,7,8,9]

            if(fecha_sistema.month in meses):
                mes_con_cero = f"0{fecha_sistema.month}"
                fecha_actual = f"{fecha_sistema.day}/{mes_con_cero}/{fecha_sistema.year}"

            else:
                fecha_actual = f"{fecha_sistema.day}/{fecha_sistema.month}/{fecha_sistema.year}"

            #fecha_actuales = "16/02/2024"

            ventas_dia_actual = supabase.table(tabla_ventas_produccion).select("nombre_agente", "lider_equipo").eq('fecha_ingreso_venta', fecha_actual).execute()

            print(ventas_dia_actual)

            ventas_dia_actual_data = ventas_dia_actual.data
            if len(ventas_dia_actual_data) == 0:
                return jsonify({"venta_dia_status": "error", "mensaje": "No hay ventas con esa fecha..."}), 200

            else:
                # Número de ventas en el dia actual
                cant_ventas_dia_actual = len(ventas_dia_actual_data)

                # Contar la frecuencia de cada nombre de agente
                frecuencia_nombres = Counter(agente['nombre_agente'] for agente in ventas_dia_actual_data)
                frecuencia_team_leader = Counter(team_leader['lider_equipo'] for team_leader in ventas_dia_actual_data)

                return jsonify({"ventas_dia_actual": ventas_dia_actual_data, "cant_ventas_dia_actual": cant_ventas_dia_actual, "cant_ventas_vendedores": frecuencia_nombres, "cant_ventas_xteam_leader": frecuencia_team_leader}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Muestra las estadisticas de los agentes y lideres de equipos relacionadas a las ventas del mes actual
    # /estadisticas-agentes-mensual/
    def estadisticas_agentes_mensual(self):

        try:
            fecha_sistema = datetime.now()

            ventas_realizadas = supabase.table(tabla_ventas_produccion).select("*").order('id.desc').execute()

            ventas_realizadas_data = ventas_realizadas.data
            if len(ventas_realizadas_data) == 0:
                return jsonify({"eliminacion_venta_status": "error", "mensaje": "No hay ventas con esa fecha..."}), 200

            else:
                mes_actual = fecha_sistema.month
                ventas_mes_actual = []

                #Filtrar ventas del mes en curso
                for i in range(0, len(ventas_realizadas_data), 1):
                    formato_fecha = datetime.strptime(ventas_realizadas_data[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                    # Mes actual
                    if formato_fecha.month == mes_actual:
                        ventas_mes_actual.append(ventas_realizadas_data[i])

                # Contar la frecuencia de cada nombre de agente
                frecuencia_nombres = Counter(agente['nombre_agente'] for agente in ventas_mes_actual)
                frecuencia_team_leader = Counter(team_leader['lider_equipo'] for team_leader in ventas_mes_actual)

                # Combinar la frecuencia con la información de ventas_mes_actual
                for agente in ventas_mes_actual:
                    nombre = agente['nombre_agente']
                    agente['frecuencia'] = frecuencia_nombres[nombre]

                venta_agentes = []
                # Imprimir el resultado
                for agente in ventas_mes_actual:
                    venta_agentes.append(agente)

                cant_ventas_mes_actual = len(ventas_mes_actual)

                return jsonify({"mes": mes_actual, "cant_ventas_xagente": frecuencia_nombres, "cant_ventas_xteam_leader": frecuencia_team_leader, "venta_agentes": venta_agentes, "cant_ventas_mes_actual" : cant_ventas_mes_actual}), 200

        except Exception as e:
            print("Ocurrió un error:", e)
            return jsonify({"mensaje": "Ocurrió un error al procesar la solicitud."}), 500

    # Muestra las ventas de los agentes en la semana
    def ventas_agente_semana_actual(self):

        try:
            response = supabase.table(tabla_ventas_produccion).select("id","fecha_ingreso_venta", "nombre_agente", "lider_equipo").gt('id', 1000).order('id.desc').execute()

            response_data = response.data

            # Obtener la fecha actual
            fecha_actual = datetime.now()

            # Obtener el primer día de la semana actual (lunes)
            primer_dia_semana = (fecha_actual - timedelta(days=fecha_actual.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)

            # Obtener el último día de la semana actual (domingo)
            ultimo_dia_semana = (primer_dia_semana + timedelta(days=6)).replace(hour=0, minute=0, second=0, microsecond=0)

            # Filtro de ventas según la semana actual
            ventas_semana_actual = []

            for venta in response_data:

                formato_fecha = datetime.strptime(venta['fecha_ingreso_venta'], "%d/%m/%Y")
                # Verificar si la venta ocurrió dentro de la semana actual
                if primer_dia_semana <= formato_fecha <= ultimo_dia_semana:
                    ventas_semana_actual.append(venta)

            frecuencia_nombres = Counter(agente['nombre_agente'] for agente in ventas_semana_actual)
            frecuencia_team_leader = Counter(team_leader['lider_equipo'] for team_leader in ventas_semana_actual)

            cant_ventas_semana_actual = len(ventas_semana_actual)

            return jsonify({
                "semana_actual": ventas_semana_actual,
                "agentes_semana_actual" : frecuencia_nombres,
                "team_leader_semana_actual" : frecuencia_team_leader,
                "cant_ventas_semana_actual": cant_ventas_semana_actual
            })


        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    # NO SE QUE HACEN ACÁ
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

    # Muestra las ventas de un agente en la semana
    def ventas_semana_actual(self, cedula):

        try:
            response_data = supabase.table(tabla_ventas_produccion).select('*').eq('cedula', cedula).execute()

            # Obtener la fecha actual
            fecha_actual = datetime.now()

            # Obtener el primer día de la semana actual (lunes)
            primer_dia_semana = fecha_actual - timedelta(days = fecha_actual.weekday())

            # Obtener el último día de la semana actual (domingo)
            ultimo_dia_semana = primer_dia_semana + timedelta(days = 6)

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

            #response = requests.get(f'https://fzsgnsghygycitueebre.supabase.co/rest/v1/VENTAS_REALIZADAS_MAL?cedula=eq.{cedula}',
            #                        headers = headers)
            ventas_realizadas = supabase.table(tabla_ventas_produccion).select("*").eq('cedula', cedula).execute()
            #ventas_realizadas = json.loads(response.text)
            print(ventas_realizadas)
            venta_mes_especifico = []

            #Filtro de ventas según los meses
            for i in range(0, len(ventas_realizadas), 1):
                formato_fecha = datetime.strptime(ventas_realizadas[i]['fecha_ingreso_venta'], "%d/%m/%Y")

                if formato_fecha.year == int(year) and formato_fecha.month == int(mes):
                    venta_mes_especifico.append(ventas_realizadas[i])

            return jsonify({
                "mostrar_ventas_mes_especifico": venta_mes_especifico
            }), 200

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    # NO SE QUE HACEN ACÁ
    # /info-codigo/
    def info_codigo(self):

        try:
            codigo = request.json.get('codigo_postal')

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            response = supabase.table('CODIGOS_POSTALES').select("*").eq("codigo_postal", codigo).execute()
            if len(response.data) == 0:
                return jsonify({
                    "codigo_postal": "No encontrado",
                    })

            else:
                codigo_postal = response.data[0]['codigo_postal']
                nombre_provincia = response.data[0]['nombre_provincia']
                nombre_comunidad = response.data[0]['nombre_comunidad']


                return jsonify({
                    "codigo_postal": codigo_postal,
                    "nombre_provincia" : nombre_provincia,
                    "nombre_comunidad" : nombre_comunidad
                    })

        except requests.exceptions.HTTPError as err:
                print(err)
        return 201

    def detectar_mes(self, mes):
        meses = {
            "2" : 'Feb',
            "3" : 'Mar',
            "4" : 'Abr',
            "5" : 'May',
            "6" : 'Jun',
            "7" : 'Jul',
            "8" : 'Ago',
            "9" : 'Sep',
            "10" : 'Oct',
            "11" : 'Nov',
            "12" : 'Dic',
        }

        if mes in meses:
            return meses[mes]



