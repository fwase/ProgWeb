const express = require("express");
const router = express.Router();
const mainController = require("../app/controllers/main")

router.get("/index",         mainController.index)
router.get("/sobre",    mainController.sobre)
router.get("/jogo",     mainController.jogo)
router.get("/interface",mainController.interface)
router.get("/cursos",   mainController.cursos)
/*
router.use(function(req, res) {
    res.statusCode = 404;
    res.end("404!");
});
*/

module.exports = router;