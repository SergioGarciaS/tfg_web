const filterAuthorsByYears = (authors, startYear, numYears) => {
    const authorCount = {};
    for (let i = 0; i < numYears; i++) {
        const year = startYear - i;
        authors.forEach(author => {
            if (parseInt(author.year) === year) {
                const authors = author.author.split('|');
                authors.forEach(author => {
                    if (author !== ''){
                    if (authorCount[author]) {
                        authorCount[author]++;
                    } else {
                        authorCount[author] = 1;
                    }
                    }});
            }
        });                   
    }            

    const sortedAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]).slice(0, 20);       
    return sortedAuthors.map(([name, count]) => ({name, count}));

}
const enableEventHandlers = (ICSME, MSR, ESEM, MODELS, SANER) => {
    document.querySelector('#featuresOptions').onchange = e => {
        const { value: property, text: label } = e.target.selectedOptions[0];
        const currentYear = "2023"; // Último año natural completo

        let datasets = { ICSME, MSR, ESEM, MODELS, SANER };
        let charts = ['modelsChart', 'modelsChart2', 'modelsChart3', 'modelsChart4', 'modelsChart5','vennChart'];
        let filteredDatasets = {};
        for (let datasetKey in datasets) {
            let dataset = datasets[datasetKey];
            let newData = [];
            if (property === 'OneYear') {
                newData = filterAuthorsByYears(dataset, currentYear, 1);
            } else if (property === 'fiveYears') {
                newData = filterAuthorsByYears(dataset, currentYear, 5);
            } else if (property === 'tenYears') {
                newData = filterAuthorsByYears(dataset, currentYear, 10);
            } else if (property === 'All_time') {
                newData = filterAuthorsByYears(dataset, currentYear, 50);
            }
            filteredDatasets[datasetKey] = newData;
            updateChartData(charts.shift(), newData, label);
        }

        updateVennChart(ICSME, MSR, ESEM, MODELS, SANER, property, currentYear);

    }
}

const filterAuthorsByYears_venn = (authors, startYear, numYears) => {
    const authorCount = {};
    if (numYears === 'OneYear') {
        numYears = 1;
    } else if (numYears === 'fiveYears') {
        numYears = 5;
    } else if (numYears === 'tenYears') {
        numYears = 10;
    } else if (numYears === 'All_time') {
        numYears = 50;
    }
    for (let i = 0; i < numYears; i++) {
        const year = startYear - i;
        authors.forEach(author => {
            if (parseInt(author.year) === year) {
                const authors = author.author.split('|');
                authors.forEach(author => {
                    if (author !== ''){
                        if (authorCount[author]) {
                            authorCount[author]++;
                        } else {
                            authorCount[author] = 1;
                        }
                    }
                });
            }
        });                   
    }            

    const sortedAuthors = Object.entries(authorCount).sort((a, b) => b[1] - a[1]);       
    return sortedAuthors.map(([name, count]) => ({name, count}));

}

const updateVennChart = (dataset1, dataset2, dataset3, dataset4, dataset5, property, currentYear) => {

    const authorNamesFromDataset = dataset => {
        
        return filterAuthorsByYears_venn(dataset, currentYear, property).map(record => record.name);
    };

    const authorNames1 = authorNamesFromDataset(dataset1);
    const authorNames2 = authorNamesFromDataset(dataset2);
    const authorNames3 = authorNamesFromDataset(dataset3);
    const authorNames4 = authorNamesFromDataset(dataset4);
    const authorNames5 = authorNamesFromDataset(dataset5);

    const authorCount1 = new Set(authorNames1);
    const authorCount2 = new Set(authorNames2);
    const authorCount3 = new Set(authorNames3);
    const authorCount4 = new Set(authorNames4);
    const authorCount5 = new Set(authorNames5);

    const data = ChartVenn.extractSets (
        [
        { label: "ICSME",values: [...authorCount1]},
        { label: "MSR", values: [...authorCount2]},
        { label: "ESEM", values: [...authorCount3]},
        { label: "MODELS", values: [...authorCount4]},
        { label: "SANER", values: [...authorCount5]},
        ],
        // {

        // }
    );

    const ctx = document.getElementById('vennChart').getContext('2d');
    const chartInstance = Chart.getChart(ctx);

    if (chartInstance) {
        chartInstance.data = data;
        chartInstance.update();
    } else {
        new Chart(ctx, {
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
    }
};
