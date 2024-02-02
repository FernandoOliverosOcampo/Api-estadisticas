from modelos.agente.agente_modelo import *

mod_agente = Agente()

class AgenteControlador():
    
    def mostrar_datos_personales(self, cedula):
        query = mod_agente.mostrar_datos_personales(cedula)
        return query
    
    def estadisticas(self, cedula):
        query = mod_agente.estadisticas(cedula)
        return query
    def registro_de_agente(self):
        query = mod_agente.registro_agentes()
        return query