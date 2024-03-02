#-*- coding:utf-8 -*-

import xml.etree.ElementTree as ET
import sqlite3
from html.parser import HTMLParser


#xml_file = "./proba.xml"
xml_file = "../dblp.xml"

context = ET.iterparse(xml_file, events=("start", "end"))

db_file = "base_de_datos.db"
conn = sqlite3.connect(db_file)
cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS eventos (title TEXT,pages INTERGER,year INTERGER,booktitle TEXT,ee TEXT,url TEXT)""")

for event, elem in context:

    if event == "end" and elem.tag == "incollection":
        print(elem.attrib.get("key"))
        if elem.attrib.get("key") != "reference/vision/Beyerer14":
            titulo = elem.find("title").text
            pages = elem.find("pages").text
            year = elem.find("year").text
            booktitle= elem.find("booktitle").text
            ee = elem.find("ee").text
            url = elem.find("url").text
        
            #print(titulo, ": ", year, ": ", pages, ": " , booktitle) #COMPROBACION
            
            cur.execute("INSERT INTO eventos (title,pages,year,booktitle,ee,url) VALUES (?, ?, ?, ?, ?, ?)", (titulo,pages,year,booktitle,ee,url))
            elem.clear()

conn.commit()
conn.close()