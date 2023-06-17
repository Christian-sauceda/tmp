import {
    Router
} from "express";
import * as catepgchannelCtrl from '../../controllers/maintenance.controllers/catepgchannel.controller';

const router = Router();

router.get('/', catepgchannelCtrl.getCatepgchannel);
router.get('/:COD', catepgchannelCtrl.getCatepgchannelById);
router.post('/', catepgchannelCtrl.createCatepgchannel);
router.put('/:COD', catepgchannelCtrl.updateCatepgchannelById);
router.delete('/:COD', catepgchannelCtrl.deleteCatepgchannelById);

export default router;