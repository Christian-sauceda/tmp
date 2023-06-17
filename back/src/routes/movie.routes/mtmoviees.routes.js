import {
    Router
} from "express";
import * as movieESCtrl from '../../controllers/mtmovie.controllers/mtmoviees.controller';

const router = Router();

router.get('/:ID', movieESCtrl.getmoviees);
router.get('/count/es/:ID', movieESCtrl.countmoviees);
router.get('/getmoviees/lastday/:ID', movieESCtrl.getmovieeslastday);
router.get('/:COD/:ID', movieESCtrl.getmovieesById);
router.post('/', movieESCtrl.createmoviees);
router.put('/:COD/:ID', movieESCtrl.updatemovieesById);
router.delete('/:COD/:ID', movieESCtrl.deletemovieesById);

export default router;