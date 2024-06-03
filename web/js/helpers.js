const fetchAuthorsData = (...urls) => {
    const promises = urls.map(url => fetch(url).then(response => response.json()))
    return Promise.all(promises)
}

const getDataColors = opacity => {
    const colors = ['#7448c2', '#21c0d7', '#d99e2b', '#cd3a81', '#9c99cc', '#e14eca', '#ffffff', '#ff0000', '#d6ff00', '#0038ff']
    return colors.map(color => opacity ? `${color + opacity}` : color)
}

