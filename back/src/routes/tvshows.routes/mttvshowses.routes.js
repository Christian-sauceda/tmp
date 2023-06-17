import {
    Router
} from "express";
import * as tvshowsESCtrl from '../../controllers/mttvshows.controllers/mttvshowses.controller';

const router = Router();

router.get('/:ID', tvshowsESCtrl.gettvshowses);
router.get('/:COD/:ID', tvshowsESCtrl.gettvshowsesById);
router.get('/count/es/:ID', tvshowsESCtrl.countseriees);
router.get('/seltvshow/es/:ID', tvshowsESCtrl.getselecttvshowses);
router.get('/getserieses/lastday/:ID', tvshowsESCtrl.gettvshowseslastday);
router.post('/', tvshowsESCtrl.createtvshowses);
router.put('/:COD/:ID', tvshowsESCtrl.updatetvshowsesById);
router.delete('/:COD', tvshowsESCtrl.deletetvshowsesById);

export default router;