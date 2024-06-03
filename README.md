# COMPARACIÓN AUTORES DBLP

Modo de uso: 
Se descarga el archivo dblp.xml.gz y dblp.dtd en el mismo directorio donde se hace el gitclon del proyecto, desde la URL: https://dblp.org/xml/


Puedes descargarlo a mano o con el comando wget, para ello tienes que instalar:
    wget: 
    
    apt-get install wget

y mas tarde descargar los archivos con el comando: 
    
    wget https://dblp.org/xml/dblp.dtd
    wget https://dblp.org/xml/dblp.xml.gz


Se descomprime el archivo en el directorio: 
    
    gzip -d dblp.xml.gz

1. Para exportar el XML a db se debe de ejecutar el siguiente comando:
a

    python3 main_dblp_parser.py --dblp dblp.xml --output DBLP.db

Este proceso tarda alrededor de 5-6 minutos, se exportan las siguientes columnas con sus
formatos:

    genre 
    title 
    author 
    year 
    booktitle 
    ee 
    crossref 
    url

Pudiéndose visualizar en la siguiente url:
    https://inloop.github.io/sqlite-viewer/

![Grafico_db](./im_readme/grafico_db.png)

2. Una vez que se obtiene la salida como base de datos, ya se puede operar y extaer los
datos en un json.

Para obtener dicho json se debe crear una lista con los "booktitle" que quieras extraer y 
ejecutar el comando: 

    python3 extraccion_datos_concretos.py

Te devuelve un JSON en el cual se guardan diccionarios por cada Bookmark.

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

3. Aquí es cuando se ejecuta un servidor json:

el cual se instala y ejecuta de la siguiente manera: https://github.com/typicode/json-server

- Se instala node.js
    sudo apt install nodejs
- Se instala la librería npm.
    sudo apt install npm
- Se instala el json-server
    sudo npm install -g json-server@0.16.3

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


4. Lo siguiente es abrir el archivo /web/index.html, en dicha web se puede observar 3 gráficos:

- Autores que más aparecen en el primer Bookmark configurado.
![Primeros_autores](./im_readme/ICSME.png)

- Autores que más aparecen en el segundo Bookmark configurado.
![Segundos_autores](./im_readme/MSR.png)
- Autores que más aparecen coincidentes en ambos.
![Segundos_autores](./im_readme/Comunes.png)
