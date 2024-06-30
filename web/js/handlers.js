const filterAuthorsByYears = (authors, startYear, numYears) => {
    const authorCount = {};
    console.log("PASA POR AQUI IOP")
    for (let i = 0; i < numYears; i++) {
        const year = startYear - i;
        console.log(year, typeof(year))
        authors.forEach(author => {
            console.log("JAMENAUER",author.year, typeof(author.year))
            if (parseInt(author.year) === year) {
                const authors = author.author.split('|');
                authors.forEach(author => {
                    if (author !== ''){
                    if (authorCount[author]) {
                        authorCount[author]++;
                    } else {
                        authorCount[author] = 1;
                    }
                    console.log("PAQUITO",authorCount[author])
                    }});
            }
        });                   
    }            

    const sortedAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]).slice(0, 20);
    console.log("FISTROPECADORJARLLLL",sortedAuthors, typeof(sortedAuthors))
    // Extraer los nombres de los autores y sus frecuencias
    const topAuthors = sortedAuthors.map(entry => entry[0]);
    const topCounts = sortedAuthors.map(entry => entry[1]);
     console.log(topAuthors, "asdadjalkjdaskljdalksjdaslk")
     console.log(topCounts, "123123191'093'0910'923")           
            
        
    
    return Object.entries(sortedAuthors).map(([name, count]) => ({ name, count}));
}

const enableEventHandlers = (authors) => {
    document.querySelector('#featuresOptions').onchange = e => {
        const { value: property, text: label } = e.target.selectedOptions[0];
        let newData = [];
        const currentYear = "2023"; // Año actual

        if (property === 'OneYear') {
            console.log("un añito");
            newData = filterAuthorsByYears(authors, currentYear, 1);
        } else if (property === 'fiveYears') {
            console.log("entro aqui");
            newData = filterAuthorsByYears(authors, currentYear, 5);
        } else if (property === 'tenYears') {
            console.log("entro aqui");
            newData = filterAuthorsByYears(authors, currentYear, 10);
        } else if (property === 'All_time') {
            console.log("toslosaños");
            newData = authors; // Sin filtrar, mostrar todos los autores
        }

        console.log("neASDASKDSAData", newData);
        updateChartData('modelsChart2', newData, label);
    }
}