import {
    Router
} from "express";
import * as movieadultCtrl from '../../controllers/mtmovie.controllers/mtmovieadult.controller';

const router = Router();

router.get('/:ID', movieadultCtrl.getmovieadult);
router.get('/:COD/:ID', movieadultCtrl.getmovieadultById);
router.get('/count/adult/:ID', movieadultCtrl.countmovieadult);
router.get('/getmovieadult/lastday/:ID', movieadultCtrl.getmovieadultlastday);
router.post('/', movieadultCtrl.createmovieadult);
router.put('/:COD', movieadultCtrl.updatemovieadultById);
router.delete('/:COD/:ID', movieadultCtrl.deletemovieadultById);

export default router;