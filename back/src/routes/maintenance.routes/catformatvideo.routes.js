import {
    Router
} from "express";
import * as catformatVideoCtrl from '../../controllers/maintenance.controllers/catformatvideo.controllers';

const router = Router();

router.get('/', catformatVideoCtrl.getCatformartvideo);
router.get('/:COD', catformatVideoCtrl.getCatformartvideoById);
router.post('/', catformatVideoCtrl.createCatformartvideo);
router.put('/:COD', catformatVideoCtrl.updateCatformartvideoById);
router.delete('/:COD', catformatVideoCtrl.deleteCatformartvideoById);

export default router;