import {
    Router
} from "express";
import * as catQualityCtrl from '../../controllers/maintenance.controllers/catquality.controller';

const router = Router();

router.get('/', catQualityCtrl.getCatQuality);
router.get('/:COD', catQualityCtrl.getCatQualityById);
router.post('/', catQualityCtrl.createCatQuality);
router.put('/:COD', catQualityCtrl.updateCatQualityById);
router.delete('/:COD', catQualityCtrl.deleteCatQualityById);

export default router;