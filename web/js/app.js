Chart.defaults.color = '#fff'
Chart.defaults.borderColor = '#444'


const printCharts = () => {
    fetchAuthorsData('http://localhost:4400/ICSME', 'http://localhost:4400/MSR')
    .then(([ICSME, MSR]) => {
        console.log(ICSME,MSR)
        renderAuthorsChart(ICSME)
        renderAuthorsChart2(MSR)
        renderAuthorsVennChart(ICSME,MSR)
        enableEventHandlers(MSR)
    })
}

const renderAuthorsChart = bookmark => {
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

const renderAuthorsChart2 = bookmark => {
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

const renderAuthorsVennChart = (dataset1, dataset2) => {
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

    const authorsSet1 = new Set(Object.keys(authorCount1));
    const authorsSet2 = new Set(Object.keys(authorCount2));

    console.log("pasaporaqui2")
    const intersection = new Set([...authorsSet1].filter(x => authorsSet2.has(x)));
    console.log(intersection)
    const onlyInSet1 = new Set([...authorsSet1].filter(x => !authorsSet2.has(x)));

    const onlyInSet2 = new Set([...authorsSet2].filter(x => !authorsSet1.has(x)));  
    console.log(typeof onlyInSet1)
    console.log(onlyInSet1)
    console.log(onlyInSet2.size)
    console.log(intersection.size)

    const data = ChartVenn.extractSets (
        [
        { label: "ICSME",values: [...authorsSet2]},
        { label: "MSR", values: [...authorsSet1]},
        ],
        // {

        // }
    );
      
      const ctx = document.getElementById('vennChart').getContext('2d');
      //console.log(ctx)
      const chart = new Chart(ctx, {
        type: 'venn',
        data: data,
        options: {
          display: true,  
          backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
          title: {
            
            responsive: true,
            text: 'Chart.js Venn Diagram Chart',
            
          },
        },
      });
};



printCharts()
