import {
    Router
} from "express";
import * as userCtrl from "../../controllers/user.controllers/sysusersignup.controller";
import checkAuth from "../../middlewares/user.middleware.js";

const router = Router();
//area publica
router.get("/users", checkAuth, userCtrl.getuser);
// resgisro de usuario
router.post("/registro", userCtrl.registro);
// confirmacion de correo
router.get("/confirmar/:token", userCtrl.confirmar);
// login
router.post("/login", userCtrl.login);
//recuperar contraseña
router.post("/olvide-password", userCtrl.olvidePassword);
router.route("/olvide-password/:token").get(userCtrl.comprobarToken).post(userCtrl.nuevoPassword);

//area privada
//perfil
router.get("/perfil", checkAuth, userCtrl.perfil);

export default router;