import {
    Router
} from "express";
import * as cataudioCtrl from '../../controllers/maintenance.controllers/cataudio.controller';

const router = Router();


router.get('/', cataudioCtrl.getCataudio);
router.get('/:COD', cataudioCtrl.getCataudioById);
router.post('/', cataudioCtrl.createCataudio);
router.put('/:COD', cataudioCtrl.updateCataudioById);
router.delete('/:COD', cataudioCtrl.deleteCataudioById);

export default router;