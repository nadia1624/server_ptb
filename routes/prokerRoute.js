const express = require("express");
const router = express.Router();
const ProkerController = require("../controllers/prokerControllers");

router.get('/', ProkerController.lihatProker)
router.get('/detail/:id', ProkerController.getProkerDetails);
router.get('/detail/:id_detailproker', ProkerController.lihatDetailProker)

module.exports = router;