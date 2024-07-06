import sqlite3
import json
import os


def db_to_json(filedb, filejson, datos):
    columnas = ['id','genre', 'title', 'author', 'year', 'booktitle', 'ee', 'crossref', 'url']
    conexion = sqlite3.connect(filedb)
    cursor = conexion.cursor()
    datos_json = {}
    for dato in datos:
        subdatos = dato.split(",")
        orden = "SELECT * FROM 'records' WHERE"
        for idx, sub in enumerate(subdatos):
            if idx == 0:
                orden = orden + " booktitle = '" + sub + "'"
            else:
                orden = orden + " or booktitle = '" + sub + "'"
        print(orden)
        cursor.execute(orden)
        datos = cursor.fetchall()

        registros = []
        for fila in datos:
            fila_dict = {}
            for i, columna in enumerate(columnas):
                fila_dict[columna] = fila[i]
            registros.append(fila_dict)

        datos_json[subdatos[0]] = registros
    # Guardar a JSON
    with open(filejson, 'w') as archivo_json:
        json.dump(datos_json, archivo_json, indent=4)

    conexion.close()

if __name__== "__main__":
    
    # En datos incluimos los congresos a utilizar
    datos = ["MSR","SANER,CSMR","ICSME","ESEM","MODELS"]
    db_to_json('DBLP.db','out.json', datos)
