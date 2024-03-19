
def detectar_mes(mes):
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
        
mes = detectar_mes("2")

print(mes)