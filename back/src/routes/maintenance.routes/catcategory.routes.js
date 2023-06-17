import {
    Router
} from "express";
import * as catcategoryCtrl from '../../controllers/maintenance.controllers/catcategory.controller';

const router = Router();

router.get('/', catcategoryCtrl.getCatcategory);
router.get('/:COD', catcategoryCtrl.getCatcategoryById);
router.get('/type/:COD', catcategoryCtrl.getCatcategoryByType);
router.post('/', catcategoryCtrl.createcatcategory);
router.put('/:COD', catcategoryCtrl.updateCatcategoryById);
router.delete('/:COD', catcategoryCtrl.deleteCatcategoryById);

export default router;