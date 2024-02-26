from config import *
from librerias import *
from modelos.supabase.keys import *
from modelos.generales import *

class Usuario():

    def login(self):

        usuario = request.json.get('usuario')
        password = request.json.get('password')

        response = supabase.table(tabla_agentes_produccion).select('rol','cedula').eq('usuario', usuario).eq('contrasena', password).execute()

        if (len(response.data) == 0):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        cedula = response.data[0]['cedula']
        rol = response.data[0]['rol']
        access_token = create_access_token(identity = usuario)
            
        return jsonify({"access_token": access_token, "acceso": "AUTORIZADO", "cedula": cedula, "rol": rol}), 200