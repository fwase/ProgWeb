const path = process.argv[2]
const http = require('http')
const fs = require('fs');

const server = http.createServer( function(req, res) {
    var filesnames = listdir(path)

    filesnames.forEach(function(filename) {
        res.write("<h1>" + filename + "</h1>\n");
    })
    
    res.end();
});

function listdir(dirname) {
    return fs.readdirSync (dirname, {withFileTypes: true}).map(item => item.name)
}

server.listen(3000);