var str_html = "";
for (let i = 1 ; i <=10 ; i++){
    if(i != 5){
        str_html += "<table style=\"float: left; margin-right:10px\">"
    }
    else{
        str_html += "<table>"
    }
    
    str_html += "<tr> <th colspan=\"2\">Produtos de " + i + "</th> </tr>"

    for (let j = 1 ; j <= 10 ; j++){
        str_html += "<tr> <td>" + i + " x " + j + "</td> <td>" + i * j + "</td> </tr>"
    }
    
    str_html += "</table>"
    if(i == 5){
        str_html += "<br>"
    }
}

document.write(str_html);
