const express = require("express");
const router = express.Router();

//Controller
const ToughtController = require("../controllers/ToughtController");

// importar middleware de verificar usuário
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', ToughtController.dashboard)
router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.get("/", ToughtController.showToughts);
router.post("/delete", ToughtController.deleteToughts);
router.get("/atualizar/:id", ToughtController.UpToughts);
router.post("/atualizar", ToughtController.UpdateToughts);

module.exports = router;
