const express = require("express");
const router = express.Router();
const logger = require("morgan");

router.use(logger("short"));

router.get("/sobre", function (req, res) {
    res.render("index", {
        layout: false
    })
})

router.use(function(req, res) {
    res.statusCode = 404;
    res.end("404!");
});

module.exports = router;