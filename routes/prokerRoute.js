const express = require("express");
const router = express.Router();
const ProkerController = require("../controllers/prokerControllers");
const upload = require("../middleware/upload");
const {authenticateToken} = require("../middleware/authToken");

router.get('/', authenticateToken, ProkerController.lihatProker)
router.get('/detailproker/:id', authenticateToken, ProkerController.getProkerDetails);
router.post('/detail/:id_proker', authenticateToken, upload.single("gambar"), ProkerController.addProkerDetail);
router.get('/detail/:id_detailproker', authenticateToken, ProkerController.lihatDetailProker);
router.put('/status/:id_proker', authenticateToken, ProkerController.updateProkerStatus);

module.exports = router;