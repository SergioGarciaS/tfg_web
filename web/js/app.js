Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'


const printCharts = () => {
    fetchAuthorsData('http://localhost:4400/ICSME', 'http://localhost:4400/MSR')
    .then(([ICSME, MSR]) => {
        console.log(ICSME,MSR)
        renderModelsChart(ICSME)
        renderModelsChart2(MSR)
        renderTopSharedAuthorsChart(ICSME,MSR)

    })



}

const renderModelsChart = bookmark => {
    // Contar la frecuencia de cada autor
    const authorCount = {};
    bookmark.forEach(icsme => {
        const authors = icsme.author.split('|'); // Separar autores si están separados por |
        authors.forEach(author => {
            if (author !== ''){
		    if (authorCount[author]) {
		        authorCount[author]++;
		    } else {
		        authorCount[author] = 1;
		    }
        	}});
    });

    // Convertir el objeto de frecuencias a un arreglo y ordenar por frecuencia
    const sortedAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]).slice(0, 20);

    // Extraer los nombres de los autores y sus frecuencias
    const topAuthors = sortedAuthors.map(entry => entry[0]);
    const topCounts = sortedAuthors.map(entry => entry[1]);

    // Configurar los datos del gráfico
    const data = {
        labels: topAuthors,
        datasets: [{
            data: topCounts,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    };

    const options = {
        plugins: {
            legend: { position: 'left' }
        }
    };

    // Renderizar el gráfico
    new Chart('modelsChart', { type: 'doughnut', data, options });
};

const renderModelsChart2 = bookmark => {
    // Contar la frecuencia de cada autor
    const authorCount = {};
    bookmark.forEach(icsme => {
        const authors = icsme.author.split('|'); // Separar autores si están separados por |
        authors.forEach(author => {
             if (author !== ''){
		    if (authorCount[author]) {
		        authorCount[author]++;
		    } else {
		        authorCount[author] = 1;
		    }
        	}});
    });

    // Convertir el objeto de frecuencias a un arreglo y ordenar por frecuencia
    const sortedAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]).slice(0, 20);

    // Extraer los nombres de los autores y sus frecuencias
    const topAuthors = sortedAuthors.map(entry => entry[0]);
    const topCounts = sortedAuthors.map(entry => entry[1]);

    // Configurar los datos del gráfico
    const data = {
        labels: topAuthors,
        datasets: [{
            data: topCounts,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(20)
        }]
    };

    const options = {
        plugins: {
            legend: { position: 'left' }
        }
    };

    // Renderizar el gráfico
    new Chart('modelsChart2', { type: 'polarArea', data, options });
};

const renderTopSharedAuthorsChart = (dataset1, dataset2) => {
    // Función para contar la frecuencia de los autores
    const countAuthors = dataset => {
        const authorCount = {};
        dataset.forEach(record => {
            const authors = record.author.split('|'); // Separar autores si están separados por |
            authors.forEach(author => {
                if (authorCount[author]) {
                    authorCount[author]++;
                } else {
                    authorCount[author] = 1;
                }
            });
        });
        return authorCount;
    };

    // Contar la frecuencia de los autores en ambos conjuntos de datos
    const authorCount1 = countAuthors(dataset1);
    console.log("pasaporaqui")
    const authorCount2 = countAuthors(dataset2);

    // Encontrar los autores comunes y calcular las frecuencias combinadas
    const sharedAuthors = {};
    for (const author in authorCount1) {
        if (authorCount2[author]) {
            sharedAuthors[author] = authorCount1[author] - authorCount2[author];
        }
    }

    // Ordenar los autores comunes por la frecuencia combinada y seleccionar los 20 principales
    const sortedSharedAuthors = Object.entries(sharedAuthors).sort((a, b) => b[1] - a[1]).slice(0, 100);
    const topAuthors = sortedSharedAuthors.map(entry => entry[0]);
    const topCounts = sortedSharedAuthors.map(entry => entry[1]);

    // Configurar los datos del gráfico
    const data = {
        labels: topAuthors,
        datasets: [{
            label: 'Veces Compartidas',
            data: topCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
        }]
    };

    const options = {
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: '20 Autores Más Compartidos entre ICSME y MSR'
            }
        }
    };

    // Renderizar el gráfico
    new Chart('combineAuthor', { type: 'bar', data, options });
};


printCharts()
