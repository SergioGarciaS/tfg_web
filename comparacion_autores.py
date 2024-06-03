import extraccion_datos_concretos as AR
import main as MA
import time
from dblp_parser import parse_record

Search1 = {}
Search2 = {}
claves_comunes = {}
def comparacion_busqueda(busqueda1, busqueda2):
    Search1 = AR.author_read(busqueda1)
    Search2 = AR.author_read(busqueda2)
    #Elementos comunes entre un diccionario y el segundo.
    claves_comunes = Search1.keys() & Search2.keys()
    #Todas las claves únicas de ambos diccionarios:
    #claves_totales = ICSME.keys() | MSR.keys()
    #print(claves_totales)
    #Diferencia de claves que están presentes en el primer diccionario pero no en el segundo
    #claves_diff = ICSME.keys() - MSR.keys()
    #print(claves_diff)
    return claves_comunes

""" LEER DE DIRECTORIO PARA COMPARAR """
busqueda = AR.lectura_archivos_directorio('./comparaciones')
print(busqueda)
comparacion_busqueda('./comparaciones/' + busqueda[0], './comparaciones/' + busqueda[1])
print(AR.ordenar_print(claves_comunes))