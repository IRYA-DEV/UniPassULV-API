import { Router } from "express";
import { getUser, getBuscarCheckers, buscarUserMatricula, buscarPersona, SearchTokenFCM } from "../controller/user.controller.js";

const router = Router();

router.get("/user/:Id", getUser);
router.get("/userChecks/:EmailAsignador", getBuscarCheckers);
router.get("/userMatricula/:Matricula", buscarUserMatricula);
router.get("/buscarUser/:Nombre", buscarPersona);
router.get("/VerToken/:Matricula", SearchTokenFCM);

export default router;
