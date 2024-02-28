import unittest
from unittest.mock import patch
from modelos.venta import venta_modelo

class TestMostrarTodasVentasRealizadas(unittest.TestCase):

    @patch('Venta.supabase.table')
    def test_mostrar_todas_ventas_realizadas_exito(self, mock_supabase_table):
        # Configurar el comportamiento simulado para supabase.table
        mock_supabase_table.return_value.select.return_value.gt.return_value.order.return_value.execute.return_value.data = [
            {"id": 1, "producto": "Producto A", "cantidad": 10},
            {"id": 2, "producto": "Producto B", "cantidad": 5}
        ]

        # Crear una instancia de la clase que contiene la función
        tu_clase_instancia = TuClase()

        # Llamar a la función que quieres probar
        resultado = tu_clase_instancia.mostrar_todas_ventas_realizadas()

        # Verificar el resultado
        self.assertEqual(resultado[1], 200)
        self.assertIn("ventas", resultado[0])

    @patch('tu_modulo.supabase.table')
    def test_mostrar_todas_ventas_realizadas_sin_registros(self, mock_supabase_table):
        # Configurar el comportamiento simulado para supabase.table cuando no hay registros
        mock_supabase_table.return_value.select.return_value.gt.return_value.order.return_value.execute.return_value.data = []

        # Crear una instancia de la clase que contiene la función
        tu_clase_instancia = TuClase()

        # Llamar a la función que quieres probar
        resultado = tu_clase_instancia.mostrar_todas_ventas_realizadas()

        # Verificar el resultado
        self.assertEqual(resultado[1], 200)
        self.assertEqual(resultado[0], {"res": "No hay registros en esta tabla"})

    @patch('tu_modulo.supabase.table')
    def test_mostrar_todas_ventas_realizadas_error(self, mock_supabase_table):
        # Configurar el comportamiento simulado para supabase.table cuando hay un error
        mock_supabase_table.return_value.select.return_value.gt.return_value.order.return_value.execute.side_effect = Exception("Simulación de error")

        # Crear una instancia de la clase que contiene la función
        tu_clase_instancia = TuClase()

        # Llamar a la función que quieres probar
        resultado = tu_clase_instancia.mostrar_todas_ventas_realizadas()

        # Verificar el resultado
        self.assertEqual(resultado[1], 500)
        self.assertIn("mensaje", resultado[0])

if __name__ == '__main__':
    unittest.main()
