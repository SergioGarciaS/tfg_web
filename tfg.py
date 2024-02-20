import requests
from bs4 import BeautifulSoup

url = 'https://dblp.org/pid/r/GregorioRobles.html'

# Solicitud de HTTP
response = requests.get(url)

# Verificar si la solicitud fue exitosa (código de estado 200)
if response.status_code == 200:

    soup = BeautifulSoup(response.text, 'html.parser')

    datos = soup.find_all("span",{"itemprop":"name"})


    for dato in datos:
        #print(dato.get('span,{"itemprop":"author"'))
        print(dato.get('title'))
else:
    print('Error al realizar la solicitud HTTP:', response.status_code)