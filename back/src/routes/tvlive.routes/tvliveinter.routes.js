import {
    Router
} from "express";
import * as tvliveINTERCtrl from '../../controllers/tvlive.controllers/tvliveinter.controller';

const router = Router();

router.get('/:ID', tvliveINTERCtrl.gettvliveinter);
router.get('/selecttvinter/:ID', tvliveINTERCtrl.getselecttvliveinter);
router.get('/:COD/:ID', tvliveINTERCtrl.gettvliveinterById);
router.post('/', tvliveINTERCtrl.createtvliveinter);
router.put('/:COD/:ID', tvliveINTERCtrl.updatetvliveinterById);
router.delete('/:COD', tvliveINTERCtrl.deletetvliveinterById);

export default router;