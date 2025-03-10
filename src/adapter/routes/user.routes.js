import { Router } from "express";
import { getUser, getBuscarCheckers, buscarUserMatricula, buscarPersona, SearchTokenFCM, registerTokenFCM, documentComplet } from "../controller/user.controller.js";

const router = Router();

router.get("/user/:Id", getUser);
router.get("/userChecks/:EmailAsignador", getBuscarCheckers);
router.get("/userMatricula/:Matricula", buscarUserMatricula);
router.get("/buscarUser/:Nombre", buscarPersona);
router.get("/VerToken/:Matricula", SearchTokenFCM);
router.put("/TokenDispositivo/:Matricula", registerTokenFCM);
router.put("/Documentacion/:Matricula", documentComplet);

export default router;
