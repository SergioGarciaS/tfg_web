import json

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