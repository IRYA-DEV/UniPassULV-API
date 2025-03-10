import { Router } from "express";
import { getUser, getBuscarCheckers, buscarUserMatricula } from "../controller/user.controller.js";

const router = Router();

router.get("/user/:Id", getUser);
router.get("/userChecks/:EmailAsignador", getBuscarCheckers);
router.get("/buscarUser/:Matricula", buscarUserMatricula);

export default router;
