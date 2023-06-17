import {
    Router
} from "express";
import * as reportCtrl from '../../controllers/reports.controllers/report.controllers';
const multer = require('multer');

// Configurar multer
const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage });

const router = Router();

router.get('/:ID', reportCtrl.getInforme);
router.get('/date/:ID/:DATE_INIT/:DATE_END', reportCtrl.getInformeDate);
router.post('/send', upload.single('pdfDocumento'), reportCtrl.sendInforme);

export default router;