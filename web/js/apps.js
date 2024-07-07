Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'

const printCharts = () => {
    fetchAuthorsData('http://localhost:4400/ICSME', 'http://localhost:4400/MSR', 'http://localhost:4400/ESEM', 'http://localhost:4400/MODELS', 'http://localhost:4400/SANER')
        .then(([ICSME, MSR, ESEM, MODELS, SANER]) => {
            renderAuthorsChart(ICSME, "modelsChart", "doughnut" )
            renderAuthorsChart(MSR, "modelsChart2", "polarArea" )
            renderAuthorsChart(ESEM, "modelsChart3", "doughnut" )
            renderAuthorsChart(MODELS, "modelsChart4", "polarArea" )
            renderAuthorsChart(SANER, "modelsChart5", "doughnut" )
            renderAuthorsVennChart(ICSME, MSR, ESEM, MODELS, SANER)
            enableEventHandlers(ICSME, MSR, ESEM, MODELS, SANER)
        })
}

const renderAuthorsChart = (bookmark, chartId, chartType) => {
    // Contar la frecuencia de cada autor
    const authorCount = {};
    bookmark.forEach(icsme => {
        const authors = icsme.author.split('|'); // Separar autores si están separados por |
        authors.forEach(author => {
            if (author !== '') {
                if (authorCount[author]) {
                    authorCount[author]++;
                } else {
                    authorCount[author] = 1;
                }
            }
        });
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
    new Chart(chartId, { type: chartType, data, options });


};


const renderAuthorsVennChart = (dataset1, dataset2,dataset3, dataset4, dataset5) => {
    // Función para contar la frecuencia de los autores


    const countAuthors = dataset => {
        const authorCount = {};
        dataset.forEach(record => {
            const authors = record.author.split('|'); // Separar autores si están separados por |
            authors.forEach(author => {
                if (author !== ''){
                if (authorCount[author]) {
                    authorCount[author]++;
                } else {
                    authorCount[author] = 1;
                }
            }});
        });
        return authorCount;
    };


    // Contar la frecuencia de los autores en ambos conjuntos de datos
    const authorCount1 = countAuthors(dataset1);
    const authorCount2 = countAuthors(dataset2);
    const authorCount3 = countAuthors(dataset3);
    const authorCount4 = countAuthors(dataset4);
    const authorCount5 = countAuthors(dataset5);
    const authorsSet1 = new Set(Object.keys(authorCount1));
    const authorsSet2 = new Set(Object.keys(authorCount2));
    const authorsSet3 = new Set(Object.keys(authorCount3));
    const authorsSet4 = new Set(Object.keys(authorCount4));
    const authorsSet5 = new Set(Object.keys(authorCount5));

    const data = ChartVenn.extractSets (
        [
        { label: "ICSME",values: [...authorsSet2]},
        { label: "MSR", values: [...authorsSet1]},
        { label: "ESEM", values: [...authorsSet3]},
        { label: "MODELS", values: [...authorsSet4]},
        { label: "SANER", values: [...authorsSet5]},
        ],
    );
    
      const ctx = document.getElementById('vennChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'venn',
        data: data,
        options: {
          display: true,  
          borderColor: getDataColors(),
          backgroundColor: getDataColors(20),
          title: {
            
            responsive: true,
            text: 'Chart.js Venn Diagram Chart',
            
          },
        },
      });
};

printCharts();
