import {
    Router
} from "express";
import * as tvliveENCtrl from '../../controllers/tvlive.controllers/tvliveen.controller';

const router = Router();

router.get('/:ID', tvliveENCtrl.gettvliveen);
router.get('/selecttven/:ID', tvliveENCtrl.getselecttvliveen);
router.get('/:COD/:ID', tvliveENCtrl.gettvliveenById);
router.post('/', tvliveENCtrl.createtvliveen);
router.put('/:COD/:ID', tvliveENCtrl.updatetvliveenById);
router.delete('/:COD', tvliveENCtrl.deletetvliveenById);

export default router;