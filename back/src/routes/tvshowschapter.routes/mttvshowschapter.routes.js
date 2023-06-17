import {
    Router
} from "express";
import * as tvshowsChapterCtrl from '../../controllers/mttvshowschapter.controllers/mttvshowchapter.controller';

const router = Router();

router.get('/tvshow/:COD', tvshowsChapterCtrl.getchapterBytvShow);
router.get('/chapter/:COD', tvshowsChapterCtrl.getchapterByChapter);
router.post('/', tvshowsChapterCtrl.createtvshowChapter);
router.put('/:COD', tvshowsChapterCtrl.updatetvshowsChapterById);
router.delete('/:COD/:ID', tvshowsChapterCtrl.deletetvshowsChapterById);

export default router;