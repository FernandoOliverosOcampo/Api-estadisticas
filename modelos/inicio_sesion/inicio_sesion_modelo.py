from config import *
from librerias import *
from modelos.supabase.keys import *

class Usuario():

    def login(self):

        correo = request.json.get('usuario')
        password = request.json.get('password')

        # Conectamos con Supabase
        client = supabase.create_client(SUPABASE_URL, SUPABASE_KEY)

        # Buscamos el usuario en la tabla 'usuario'
        query = client.table('AGENTES').select('*').eq('usuario', correo).eq('contrasena', password)
        res = query.execute()
        # Si el usuario existe y la contraseña es correcta, se devuelve un token JWT
        if len(res.data) == 1:
            cedula = res.data[0]['cedula']
            access_token = create_access_token(identity = correo)
            
            if res.data[0]['rol'] == "admin":
                return jsonify(access_token = access_token, acceso = "AUTORIZADO", cedula = cedula, rol = res.data[0]['rol']), 200
            else:
                return jsonify(access_token = access_token, acceso = "AUTORIZADO", cedula = cedula, rol = res.data[0]['rol']), 200
        else:
            return jsonify({"msg": "Credenciales inválidas"}), 401