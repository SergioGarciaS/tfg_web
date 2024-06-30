import sqlite3
import json
import os


def db_to_json(filedb, filejson, datos):
    columnas = ['id','genre', 'title', 'author', 'year', 'booktitle', 'ee', 'crossref', 'url']
    conexion = sqlite3.connect(filedb)
    cursor = conexion.cursor()
    datos_json = {}
    for dato in datos:
        # Consulta en BBDD
        cursor.execute("SELECT * FROM 'records' WHERE booktitle = '{dato}'".format(dato=dato))
        datos = cursor.fetchall()

        registros = []
        for fila in datos:
            #print(fila)
            fila_dict = {}
            for i, columna in enumerate(columnas):
                fila_dict[columna] = fila[i]
            registros.append(fila_dict)

        datos_json[dato] = registros
    # Guardar a JSON
    with open(filejson, 'w') as archivo_json:
        json.dump(datos_json, archivo_json, indent=4)

    conexion.close()

if __name__== "__main__":

    datos = ["MSR","ICSME","FSKD"]
    db_to_json('../tfg/DBLP.db','out.json', datos)
    #author_read('salida.json')
    #print(lectura_archivos_directorio('./comparaciones'))