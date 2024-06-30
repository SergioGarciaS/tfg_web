// const enableEventHandlers = authors => {

//     document.querySelector('#featuresOptions').onchange = e => {

//         const { value: property, text: label } = e.target.selectedOptions[0]
//         console.log(property, label)
//         //const newData = coasters.map(coaster => coaster[property])

//         //updateChartData('featuresChart', newData, label)
//     }
// }

const enableEventHandlers = (authors) => {

    document.querySelector('#featuresOptions').onchange = e => {
        const { value: property, text: label } = e.target.selectedOptions[0];
        //console.log(property)
        const newData = {};
        const currentYear = "2024";
        authors.forEach(icsme => {
        if (property === 'OneYear') {
            console.log("un añito")
            const newData= authors.map(author => authors.year === currentYear || authors.year === currentYear - 1);
        } else if (property === 'fiveYears') {
            console.log("entro aqui")
            const newData= authors.map(author => authors.year <= currentYear && authors.year >= currentYear - 5);
        } else if (property === 'All_time') {
            console.log("toslosaños")
            const newData= authors; // No filtering, show all authors
        }}
    )

        console.log(newData);
        updateChartData('modelsChart', newData, label)
        // Aquí puedes actualizar los datos del gráfico o la interfaz según lo necesites
        // updateChartData('featuresChart', filteredAuthors, label);
    }
}