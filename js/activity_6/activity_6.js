let buttonDraw = document.getElementById("desenhar");
let heightBars = document.getElementsByClassName("barra");
let widthBar = document.getElementById("largura");


function drawChart(data, width) {
    let chart = document.getElementById("grafico")
    let ctxChart = chart.getContext("2d")
    ctxChart.fillStyle = "red"
    
    let height = chart.height
    let maxValue = Math.max(...data)

    for(let i = 0 ; i < data.length ; i++){
        let x = (i * width) + (i * 5)
        let y = height - (height * (data[i] / maxValue)) + 10
        ctxChart.fillRect(x, y, width, chart.height);
    }
}

function resetChart(){
    let chart = document.getElementById("grafico")
    let ctxChart = chart.getContext("2d")
    ctxChart.clearRect(0, 0, chart.width, chart.height)
}

function getValuesHeight(heightBars) {
    let values = []

    for(let i = 0 ; i < heightBars.length ; i++){
        values.push(parseInt(heightBars[i].value))
    }

    return values
}

buttonDraw.onclick = function(){
    let valuesHeight = getValuesHeight(heightBars)

    resetChart()
    drawChart(valuesHeight, parseInt(widthBar.value))
}