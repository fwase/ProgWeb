const express = require("express");
const router = express.Router();
const MainController = require("../app/controllers/main")
const AreaController = require("../app/controllers/area")

// MainController
router.get("/index",    MainController.index)
router.get("/sobre",    MainController.sobre)
router.get("/jogo",     MainController.jogo)
router.get("/interface",MainController.interface)
router.get("/cursos",   MainController.cursos)
//router.get("/area",     MainController.area)

// AreaController
router.get('/area' ,    AreaController.index);

module.exports = router;