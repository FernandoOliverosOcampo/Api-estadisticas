from modelos.equipo.equipo_modelo import *

mod_equipo = Equipo()

class EquipoControlador():
    
    def info_equipo(self, lider_equipo):
        query = mod_equipo.info_equipo(lider_equipo)
        return query
    
    def venta_realizadas_agente_equipo(self):
        query = mod_equipo.ventas_realizadas()
        return query
    
    def agentes_pertenecientes(self, lider_equipo):
        query = mod_equipo.agentes_pertenecientes(lider_equipo)
        return query
