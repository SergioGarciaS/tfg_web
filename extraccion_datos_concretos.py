import sqlite3
import json
import os

def lectura_archivos_directorio(ruta):

    directorio = ruta

    archivos = []

    # Leer los archivos del directorio
    for archivo in os.listdir(directorio):
        if os.path.isfile(os.path.join(directorio, archivo)):
            archivos.append(archivo)

    return archivos



def db_to_json(filedb, filejson,dato):
    columnas = ['id','genre', 'title', 'author', 'year', 'booktitle', 'ee', 'crossref', 'url']
    conexion = sqlite3.connect(filedb)
    cursor = conexion.cursor()

    # Consulta en BBDD
    cursor.execute("SELECT * FROM 'records' WHERE booktitle = '{dato}'".format(dato=dato))
    datos = cursor.fetchall()

    datos_json = []
    for fila in datos:
        print(fila)
        fila_dict = {}
        for i, columna in enumerate(columnas):
            fila_dict[columna] = fila[i]
        datos_json.append(fila_dict)

    # Guardar a JSON
    with open(filejson, 'w') as archivo_json:
        json.dump(datos_json, archivo_json, indent=4)

    conexion.close()

autores = []
conteo_autores = {}

def author_read(file):

    with open(file, 'r') as archivo_json:
        datos = json.load(archivo_json)

    # Extraer todos los autores
    for fila in datos:
        for autor in fila['author'].split('|'):
            if autor in conteo_autores:
                conteo_autores[autor] += 1
            else:
                conteo_autores[autor] = 1
                autores.append(autor)
    
    return conteo_autores

def ordenar_print(autores):
    conteo_autores_ordenado = dict(sorted(conteo_autores.items(), key=lambda item: item[1], reverse=True))
    # Imprimir los autores
    print("Lista de autores y su conteo:")
    for autor, conteo in conteo_autores_ordenado.items():
        print(f"{autor}: \t  {conteo} veces")


#author_read('salida.json')

#db_to_json('juanito2.db','ICSME.json')

#lectura_archivos_directorio('./comparaciones')