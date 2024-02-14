from modelos.venta.venta_modelo import *

mod_venta = Venta()

class VentaControlador():

    def descargar_ventas_realizadas(self):
        query = mod_venta.descargar_ventas_realizadas()
        return query

    def mostrar_todas_ventas_realizadas(self):
        query = mod_venta.mostrar_todas_ventas_realizadas()
        return query
    
    def mostrar_ventas_realizadas(self, cedula):
        query = mod_venta.mostrar_ventas_realizadas(cedula)
        return query
    
    def mostrar_estado_ventas(self):
        query = mod_venta.mostrar_estado_ventas()
        return query
    
    def mostrar_ventas_semana_actual(self, cedula):
        query = mod_venta.ventas_semana_actual(cedula)
        return query
    
    def mostrar_ventas_mes_especifico(self):
        query = mod_venta.mostrar_ventas_mes_especifico()
        return query
    
    def registrar_venta(self):
        query = mod_venta.registrar_venta()
        return query

    def editar_venta(self):
        query = mod_venta.editar_venta()
        return query
    
    def editar_venta_calidad(self):
        query = mod_venta.editar_venta_calidad()
        return query
    
    def editar_estado_venta(self):
        query = mod_venta.editar_estado_venta()
        return query
    
    def eliminar_venta(self, id):
        query = mod_venta.eliminar_venta(id)
        return query
    
    def venta_por_fecha(self):
        query = mod_venta.mostrar_venta_por_fecha()
        return query