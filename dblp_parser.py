#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from collections import defaultdict
import sqlite3

from lxml import etree


# Ignore the following fields
ignore_field = ['volume', 'pages', 'series', 'note', 'number']
# The following fields can have multiple values
mv_field = ['author', 'address', 'cdrom', 'pages', 'cite', 'crossref',
            'editor', 'school', 'ee', 'isbn', 'url', 'publisher']
# The following field can only have a single value
sv_field = ['booktitle', 'chapter', 'journal', 'month', 'title', 'year']
# Possible genre of the doc
genre = {'article', 'inproceedings', 'proceedings', 'book', 'incollection',
         'phdthesis', 'mastersthesis', 'www'}


def iterate_dblp(dblp):

    docs = etree.iterparse(dblp, events=('start', 'end'), dtd_validation=True,
                           load_dtd=True)
    _, root = next(docs)
    #print(docs)
    start_tag = None
    for event, doc in docs:
        #print(doc)
        if event == 'start' and start_tag is None:  # a new start
            start_tag = doc.tag
            
        if event == 'end' and doc.tag == start_tag:
            yield start_tag, doc
            start_tag = None
           # print(root) #DEBUG
            root.clear()


def parse_record(dblp, db_path):
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Creamos la tabla si no existe
    c.execute("""CREATE TABLE IF NOT EXISTS records
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, genre TEXT, title TEXT, author TEXT, year TEXT, booktitle TEXT, ee TEXT, crossref TEXT, url TEXT)""")

    for genre, record in iterate_dblp(dblp):
        attrs = defaultdict(list)
        for attr in record:
            if attr.tag not in ignore_field:  # Field to ignore
                attrs[attr.tag].append(attr.text)

        attrs['genre'] = genre

        try:
            # Insertamos los datos en la tabla
            c.execute("INSERT INTO records (genre, title, author, year, booktitle, ee, crossref, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                      (attrs['genre'], attrs.get('title', [''])[0], '|'.join(attrs.get('author', [])), attrs.get('year', [''])[0],attrs.get('booktitle', [''])[0],attrs.get('ee', [''])[0],attrs.get('crossref', [''])[0],attrs.get('url', [''])[0]))
        except ValueError as err:
            print(err)
            continue

    conn.commit()
    conn.close()