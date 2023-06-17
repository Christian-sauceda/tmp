import {
    Router
} from "express";
import * as tvliveESCtrl from '../../controllers/tvlive.controllers/tvlivees.controller';

const router = Router();

router.get('/:ID', tvliveESCtrl.gettvlivees);
router.get('/selecttves/:ID', tvliveESCtrl.getselecttvlivees);
router.get('/:COD/:ID', tvliveESCtrl.gettvliveesById);
router.post('/', tvliveESCtrl.createtvlivees);
router.put('/:COD/:ID', tvliveESCtrl.updatetvliveesById);
router.delete('/:COD', tvliveESCtrl.deletetvliveesById);

export default router;