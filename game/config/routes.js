const express = require("express");
const router = express.Router();
const logger = require("morgan");

router.use(logger("short"));

router.get("/", function (req, res) {
    res.end("Página principal do site")
})

router.get("/sobre", function (req, res) {
    res.end("Página sobre")
})

router.use(function(req, res) {
    res.statusCode = 404;
    res.end("404!");
});

module.exports = router;