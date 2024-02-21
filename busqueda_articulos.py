import json

with open("volcado.json") as file:
    diccionario = json.load(file)

def busqueda_articulos(autor):
    """ Dado un autor, se devuelve los artículos que comparten """
    titles = []
    for titulos in diccionario:
        #print(titulos)
        #print(diccionario[titulos])
        authores = diccionario[titulos]
        for author in authores:
            if author == autor:
                titles.append(titulos)
        
    
    print(titles)
        


busqueda_articulos("")