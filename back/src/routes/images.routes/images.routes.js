import { Router } from "express";
import imageController from "../../controllers/downloadimage.controllers/image.controllers";

const imageRouter = Router();

imageRouter.get('/:content/:type/:image', imageController.getImage);

export default imageRouter;