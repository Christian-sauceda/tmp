import {
    Router
} from "express";
import * as tvshowsENCtrl from '../../controllers/mttvshows.controllers/mttvshowsen.controller';

const router = Router();

router.get('/:ID', tvshowsENCtrl.gettvshowsen);
router.get('/:COD/:ID', tvshowsENCtrl.gettvshowsenById);
router.get('/count/en/:ID', tvshowsENCtrl.countserieen);
router.get('/seltvshow/en/:ID', tvshowsENCtrl.getselecttvshowsen);
router.get('/getseriesen/lastday/:ID', tvshowsENCtrl.gettvshowsenlastday);
router.post('/', tvshowsENCtrl.createtvshowsen);
router.put('/:COD/:ID', tvshowsENCtrl.updatetvshowsenById);
router.delete('/:COD', tvshowsENCtrl.deletetvshowsenById);


export default router;