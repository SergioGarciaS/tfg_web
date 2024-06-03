Modo de uso: 

1º Para exportar el XML a db se debe de ejecutar el siguiente comando:

python3 main.py --dblp (archivo xml) --output (nombre salida bd)

Este proceso tarda alrededor de 6 minutos, se exportan las siguientes columnas con sus
formatos:

    genre TEXT, 
    title TEXT, 
    author TEXT, 
    year TEXT, 
    booktitle TEXT, 
    ee TEXT, 
    crossref TEXT, 
    url TEXT

2º Una vez que se obtiene la salida como base de datos, ya se puede operar y extaer los
datos en un json.

Dicho json tiene como formato:

{
    booktitle: [
        registro
    ]
    booktitle2:[
        registro
    ]
    .
    .
    .
} 

Para obtener dicho json se debe crear una lista con los "booktitle" que quieras extraer y 
ejecutar el comando: 

python3 extracción_datos_concreto.py

Te devuelve un JSON en el cual se guardan diccionarios por cada Bookmark.

Aquí es cuando se ejecuta un servidor json:

el cual se instala y ejecuta de la siguiente manera: https://github.com/typicode/json-server

    1º Se instala node.js
    2º Se instala la librería npm.
    3º Se ejecuta el json-server --watch json.js (--port port)

Con esto tenemos un servidor json para lanzar la API.

El servidor en el que contenemos la API se lanza de la siguiente manera:

	json-server --watch out.json --port 4400

Cuyo resultado nos devuelve:

    \{^_^}/ hi!

    Loading out.json
    Done

    Resources
    http://localhost:4400/ICSME
    http://localhost:4400/MSR
    http://localhost:4400/FSKD
    http://localhost:4400/GECCO
    http://localhost:4400/SDM

    Home
    http://localhost:4400


Lo siguiente es abrir el archivo /web/index.html, en dicha web se puede observar 3 gráficos:

1º Autores que más aparecen en el primer Bookmark configurado.
2º Autores que más aparecen en el segundo Bookmark configurado.
3º Autores que más aparecen coincidentes en ambos.
