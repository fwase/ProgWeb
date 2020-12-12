const express = require("express");
const router = require("./config/routes")
const { log } = require("util");
const handlebars = require("express-handlebars")
//const http = require("http")
const app = express()

app.use(router);

app.engine("handlebars", handlebars())
app.set("view engine", "handlebars")
app.set("views", __dirname + "/views")

app.get("/", function(req, res) {
    var username = "Wase"
    res.render("index", {
        username: username, isRayn: (username=="Rayn"), layout: false
    })
})

app.listen(3000, function() {
    console.log("Express app iniciada na porta 3000.");
});