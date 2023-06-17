import {
    Router
} from "express";
import * as movieENCtrl from '../../controllers/mtmovie.controllers/mtmovieen.controller';

const router = Router();

router.get('/:ID', movieENCtrl.getmovieen);
router.get('/:COD/:ID', movieENCtrl.getmovieenById);
router.get('/count/en/:ID', movieENCtrl.countmovieen);
router.get('/getmovieen/lastday/:ID', movieENCtrl.getmovieenlastday);
router.post('/', movieENCtrl.createmovieen);
router.put('/:COD/:ID', movieENCtrl.updatemovieenById);
router.delete('/:COD/:ID', movieENCtrl.deletemovieenById);

export default router;