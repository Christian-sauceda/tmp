import {
    Router
} from "express";
import * as catypeServerCtrl from '../../controllers/maintenance.controllers/catypeserver.controller';

const router = Router();

router.get('/', catypeServerCtrl.getCatypeServer);
router.get('/:COD', catypeServerCtrl.getCatypeServerById);
router.post('/', catypeServerCtrl.createCatypeServer);
router.put('/:COD', catypeServerCtrl.updateCatypeServerById);
router.delete('/:COD', catypeServerCtrl.deleteCatypeServerById);

export default router;