import { Router } from "express";
import * as vgController from "./videogames.controller";

const router = Router();
router.route('/videogames').get(vgController.getVideoGames);
router.route('/videogames').post(vgController.createVideogame);
router.route('/videogames').put(vgController.updateVideogame);
router.route('/videogames').delete(vgController.deleteVideogame);

export default router;