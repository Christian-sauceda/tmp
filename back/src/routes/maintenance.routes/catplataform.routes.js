import {
    Router
} from "express";
import * as catPlataformoCtrl from '../../controllers/maintenance.controllers/catplataform.controller';

const router = Router();

router.get('/', catPlataformoCtrl.getCatPlataform);
router.get('/:COD', catPlataformoCtrl.getCatPlataformById);
router.post('/', catPlataformoCtrl.createCatPlataform);
router.put('/:COD', catPlataformoCtrl.updateCatPlataformById);
router.delete('/:COD', catPlataformoCtrl.deleteCatPlataformById);

export default router;