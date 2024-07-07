import json
from datetime import datetime
from itertools import combinations


def author_read(file,opt):
    conteo_autores = {}
    with open(file, 'r') as archivo_json:
        datos = json.load(archivo_json)
    datos = datos[opt]
    for fila in datos:

        year = fila.get('year')  # Obtener el año, si está disponible en cada fila
        for autor in fila['author'].split('|'):
            if autor != '':
                if autor in conteo_autores:
                    conteo_autores[autor][0] += 1
                    conteo_autores[autor][1].append(int(year))
                else:
                    conteo_autores[autor] = [1, [int(year)]]

    return conteo_autores


def authors_per_year(file, year,opt):
    conteo_autores = author_read(file,opt)
    autores_year = {}
    for autor, (conteo, years) in conteo_autores.items():
        count_year = years.count(year)
        if count_year > 0:
            autores_year[autor] = count_year

    return autores_year


def authors_some_year(file, start_year, num_years,opt):
    resultados = {}
    for i in range(num_years):
        year = start_year - i
        autores_year = authors_per_year(file, year,opt)
        for autor, count in autores_year.items():
            if autor in resultados:
                resultados[autor] += count
            else:
                resultados[autor] = count

    return resultados


def sort_print(autores):

    conteo_autores_ordenado = dict(sorted(autores.items(), key=lambda item: item[1], reverse=True))
    print("================================")
    print("  Lista de autores y su conteo:")
    print("================================")
    contador = 0
    for autor, conteo in conteo_autores_ordenado.items():
        if contador < 20:
            contador = contador + 1 
            print(f"{contador}. {autor}: \t  {conteo} veces")
        else:
            break


def search_comparison(file, opt1, opt2):

    Search1 = author_read(file, opt1)
    Search2 = author_read(file, opt2)

    dic3 = set(Search2).intersection(set(Search1))

    print(f"{opt1}: {abs(len(dic3)-len(Search1))} {opt2}: {abs(len(dic3)-len(Search2))} DIF: {len(dic3)}")


def search_comparison_per_year(file, options, start_year, num_years):
    conjuntos = []
    for opt in options:
        opt = authors_some_year(file, start_year, num_years,opt)
        conjuntos.append(opt)

    congresos = ["MSR","SANER","ICSME","ESEM","MODELS"]

    for i in range(len(conjuntos)):
        for j in range(i + 1, len(conjuntos)):
            interseccion = set(conjuntos[i]).intersection(set(conjuntos[j]))
            print(f"{congresos[i]} ∩ {congresos[j]}: {len(interseccion)}")
    

    for r in range(3, len(conjuntos) + 1):
        for combo in combinations(range(len(conjuntos)), r):
            interseccion = set(conjuntos[combo[0]])
            nombres_congresos = congresos[combo[0]]
            for k in combo[1:]:
                interseccion = interseccion.intersection(conjuntos[k])
                nombres_congresos += f" ∩ {congresos[k]}"
            print(f"{nombres_congresos}: {len(interseccion)}")



if __name__== "__main__":

    # year = datetime.today().year
    datos = ["MSR","SANER","ICSME","ESEM","MODELS"]
    for opt in datos:
        print("================================")
        print("             ", opt)
        print(sort_print(authors_some_year("out.json", 2024, 40, opt)))


    datos = ["MSR","SANER,CSMR","ICSME","ESEM","MODELS"]
    search_comparison_per_year('out.json', ["MSR","SANER","ICSME","ESEM","MODELS"], 2023 , 10)