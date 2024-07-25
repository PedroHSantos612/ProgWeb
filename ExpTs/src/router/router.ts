import { Router } from "express";

import mainController from "../controllers/main";
import majorController from "../controllers/major"
import authController from "../controllers/auth"
import { checkAuth } from "../middlewares/checkauth";

const router = Router()

router.get("/auth/signup", authController.signup);
router.post("/auth/signup", authController.signup);
router.get("/auth/login", authController.login);
router.post("/auth/login", authController.login);
router.get("/auth/logout", authController.logout);



router.get("/major",  majorController.index);
router.get("/major/create", checkAuth, majorController.create);
router.post("/major/create", majorController.create);
router.get("/major/read/:id", majorController.read);
router.get("/major/update/:id", checkAuth,majorController.update);
router.get("/major/remove/:id", checkAuth,majorController.remove); 
router.post("/major/remove/:id", checkAuth,majorController.remove);



router.get("/teste-cookie", mainController.testCookie);
router.get("/hb1", mainController.hb1);
router.get("/hb2", mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get("/bem-vindo/:nome", mainController.bemVindo);
router.get("/about", mainController.about);


export default router;