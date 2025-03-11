import { Router } from "express";
import { getUser, getBuscarCheckers, buscarUserMatricula, buscarPersona, SearchTokenFCM, registerTokenFCM, documentComplet, endCargo, updateCargo, getInfoCargo } from "../controller/user.controller.js";

const router = Router();

router.get("/user/:Id", getUser);
router.get("/userChecks/:EmailAsignador", getBuscarCheckers);
router.get("/userMatricula/:Matricula", buscarUserMatricula);
router.get("/buscarUser/:Nombre", buscarPersona);
router.get("/VerToken/:Matricula", SearchTokenFCM);
router.put("/TokenDispositivo/:Matricula", registerTokenFCM);
router.put("/Documentacion/:Matricula", documentComplet);
router.put("/terminarCargo/:Matricula", endCargo);
router.put("/cambiarCargo/:Matricula", updateCargo)
router.get("/infoCargo/:Id", getInfoCargo);

export default router;
