import requests
from bs4 import BeautifulSoup
import json

diccionario = {}
#url = 'https://dblp.org/pid/r/GregorioRobles.html'
#url = 'https://dblp.org/pid/66/1148.html'
#url = 'https://dblp.org/pid/117/9939.html'
url = 'https://dblp.org/db/journals/peerj-cs/peerj-cs7.html#DuenasCGFICG21'

# Solicitud de HTTP
headers = {
"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36",
"Accept-Encoding":"gzip, deflate",
"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
"DNT":"1"
}
response = requests.get(url,headers=headers)

# Verificar si la solicitud fue exitosa (código de estado 200)
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