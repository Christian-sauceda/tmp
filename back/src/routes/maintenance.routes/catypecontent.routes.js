import {
    Router
} from "express";
import * as catypeContentCtrl from '../../controllers/maintenance.controllers/catypecontent.controller';

const router = Router();

router.get('/', catypeContentCtrl.getCatypeContent);
router.get('/:COD', catypeContentCtrl.getCatypeContentById);
router.post('/', catypeContentCtrl.createCatypeContent);
router.put('/:COD', catypeContentCtrl.updateCatypeContentById);
router.delete('/:COD', catypeContentCtrl.deleteCatypeContentById);

export default router;