import requests
from bs4 import BeautifulSoup
import json

diccionario = {}
#url = 'https://dblp.org/pid/r/GregorioRobles.html'
url = 'https://dblp.org/db/conf/msr/msr2022.html'
#url = 'https://dblp.org/pid/117/9939.html'
#url = 'https://dblp.org/db/journals/peerj-cs/peerj-cs7.html#DuenasCGFICG21'

# Solicitud de HTTP
headers = {
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
"Accept-Encoding":"gzip, deflate",
"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
"DNT":"1"
}
response = requests.get(url,headers=headers)

def autores():
    """ Se extraen los autores, se cuentan y se ordenan de mayor a menor"""
    if response.status_code == 200:

        soup = BeautifulSoup(response.text, 'html.parser')
        datos = soup.find_all("span",{"itemprop":"name"})

        for dato in datos:
            if dato.get('title') is not None:
                if dato.get('title') in diccionario:
                    diccionario[dato.get('title')]+=1
                else:
                    diccionario[dato.get('title')]=1
                #print(dato.get('title'))
        diccionario_ordenado = dict(sorted(diccionario.items(), key=lambda item: item[1], reverse=True))
        #print(diccionario)
        with open('volcado.json', 'w') as jf: 
            json.dump(diccionario_ordenado, jf, ensure_ascii=False, indent=2)
    else:
        print('Error al realizar la solicitud HTTP:', response.status_code)

def titulos():
    if response.status_code == 200:

        soup = BeautifulSoup(response.text, 'html.parser')
        datos = soup.find_all("span",{"class":"title"},)
        
        for dato in datos:
            titulos =dato.get_text()
            print(titulos)
            if dato.get('dato') is not None:
                if dato.get('dato') in diccionario:
                    diccionario[dato.get('dato')]+=1
                else:
                    diccionario[dato.get('name')]=1
                #print(dato.get('title'))
        diccionario_ordenado = dict(sorted(diccionario.items(), key=lambda item: item[1], reverse=True))
        #print(diccionario)
        with open('volcado.json', 'w') as jf: 
            json.dump(diccionario_ordenado, jf, ensure_ascii=False, indent=2)
    else:
        print('Error al realizar la solicitud HTTP:', response.status_code)    
        
        

def articulo():
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        articulos = soup.find_all("cite") #Llamo a cada cita.
        for articulo in articulos:
            tit = articulo.find_all("span",{"class":"title"}) #Obtengo el resultado de titulo.
            titulo =tit[0].get_text()
            autores = articulo.find_all("span",{"itemprop":"name"}) #Obtengo los autores asociados al artículo.
            #print(autores)
            valor = []
            for autor in autores:
                if autor.get('title') is not None:
                    #print(autor.get_text())
                    valor.append(autor.get('title'))
            
            #print(valor)
            diccionario[titulo]=valor
            
        with open('volcado.json', 'w') as jf: 
            json.dump(diccionario, jf, ensure_ascii=False, indent=2)
        
        print("Tarea realizada con éxito.")
    else:
        print('Error al realizar la solicitud HTTP:', response.status_code)    

articulo()
