let buttonCalculate = document.getElementById("buttonOK");
let valueArea = document.getElementById("valueArea")
let valueCircunferencia = document.getElementById("valueCircunferencia")

function calculate(valueRaio) {
    let area = Math.PI * Math.pow(valueRaio,2)
    let circunferencia = 2 * Math.PI * valueRaio
    let values = {
        "area": area,
        "circunferencia": circunferencia
    }

    return values
}

buttonCalculate.onclick = function(){
    let valueRaio = parseFloat(document.getElementById("valueRaio").value)
    let valuesCalculated = calculate(valueRaio)

    valueArea.value = valuesCalculated.area.toFixed(2)
    valueCircunferencia.value = valuesCalculated.circunferencia.toFixed(2)
}