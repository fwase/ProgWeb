const express = require("express");
const router = express.Router();
const MainController = require("../app/controllers/main")
const AreaController = require("../app/controllers/area")
const CursoController = require('../app/controllers/curso');

// MainController
router.get("/index",    MainController.index)
router.get("/sobre",    MainController.sobre)
router.get("/jogo",     MainController.jogo)
router.get("/interface",MainController.interface)
//outer.get("/cursos",   MainController.cursos)
//router.get("/area",     MainController.area)

// AreaController
router.get('/area' ,    AreaController.index);

// CursoController
router.get("/curso",            CursoController.index)
router.get("/curso/:id",        CursoController.read);
router.get('/curso/create',     CursoController.create);
router.post('/curso/create' ,   CursoController.create);
router.get('/curso/update/:id', CursoController.update);
router.post('/curso/update/:id',CursoController.update);
router.post('/curso/remove/:id',CursoController.remove);

module.exports = router;