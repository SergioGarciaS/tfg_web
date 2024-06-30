import json
from datetime import datetime


def author_read(file,opt):
    conteo_autores = {}
    with open(file, 'r') as archivo_json:
        datos = json.load(archivo_json)
    datos = datos[opt]
    for fila in datos:

        year = fila.get('year')  # Obtener el año, si está disponible en cada fila
        for autor in fila['author'].split('|'):
            if autor:
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
            print(f"{contador}. {autor}: \t  {conteo} veces")
            contador = contador + 1 
        else:
            break


def search_comparison(file, opt1, opt2):

    Search1 = author_read(file, opt1)
    Search2 = author_read(file, opt2)

    dic3 = set(Search2).intersection(set(Search1))

    print(f"{opt1}: {abs(len(dic3)-len(Search1))} {opt2}: {abs(len(dic3)-len(Search2))} DIF: {len(dic3)}")


def search_comparison_per_year(file, opt1, opt2, start_year, num_years):

    Search1 = authors_some_year(file, start_year, num_years,opt1)
   
    Search2 = authors_some_year(file, start_year, num_years,opt2)

    dic3 = set(Search2).intersection(set(Search1))

    print("================================")
    print("        INTERSECCIÓN:")
    print("================================")

    print(f"{opt1}: {abs(len(dic3)-len(Search1))} {opt2}: {abs(len(dic3)-len(Search2))} DIF: {len(dic3)} \n\n")


if __name__== "__main__":

    year = datetime.today().year


    #autores1 = authors_per_year("out.json", 2017, "MSR")
    autores1 = authors_some_year("out.json", year, 45, "MSR")
    autores2 = authors_some_year("out.json", year, 45, "ICSME")

    # print(autores1)
    print("================================")
    print("             MSR")
    sort_print(autores1)
    print("================================")
    print("             ICSME")
    sort_print(autores2)

    search_comparison_per_year('out.json', 'MSR', 'ICSME', year , 45)