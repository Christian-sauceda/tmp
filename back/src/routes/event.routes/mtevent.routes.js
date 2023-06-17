import {
    Router
} from "express";
import * as eventCtrl from '../../controllers/mtevents.controllers/mtevents.controller';

const router = Router();

router.get('/:ID', eventCtrl.getevents);
router.get('/:COD/:ID', eventCtrl.geteventById);
router.get('/count/event/:ID', eventCtrl.countevent);
router.get('/selevent/es/:ID', eventCtrl.getselectevent);
router.post('/', eventCtrl.createevent);
router.put('/:COD', eventCtrl.updateeventById);
router.delete('/:COD', eventCtrl.deleteeventById);

export default router;