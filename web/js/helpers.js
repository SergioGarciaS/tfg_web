const fetchAuthorsData = (...urls) => {
    const promises = urls.map(url => fetch(url).then(response => response.json()))
    return Promise.all(promises)
}

const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00', '#0038ff']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

// const updateChartData = (chartId, data, label) => {
//     const chart = Chart.getChart(chartId)
//     chart.data.datasets[0].data = data
//     chart.data.datasets[0].label = label
//     chart.update()
// }

const updateChartData = (chartId, newData, label) => {
    const chart = Chart.getChart(chartId); // Obtén la instancia del gráfico existente

    if (chart) {
        // Actualiza los datos del gráfico existente
        chart.data.labels = newData.map(d => d.author); // Suponiendo que cada objeto tiene una propiedad 'author'
        chart.data.datasets[0].data = newData.map(d => d.count); // Suponiendo que cada objeto tiene una propiedad 'count'
        chart.options.plugins.title.text = `Actualizado: ${label}`;
        chart.update();
    } else {
        console.error(`No se encontró un gráfico con ID: ${chartId}`);
    }
}