//import { Router } from "express";
//import { getUser, getBuscarCheckers, buscarUserMatricula, buscarPersona, SearchTokenFCM, registerTokenFCM, documentComplet, endCargo, updateCargo, getInfoCargo } from "../controller/user.controller.js";

//const router = Router();

//router.get("/user/:Id", getUser);
//router.get("/userChecks/:EmailAsignador", getBuscarCheckers);
//router.get("/userMatricula/:Matricula", buscarUserMatricula);
//router.get("/buscarUser/:Nombre", buscarPersona);
//router.get("/VerToken/:Matricula", SearchTokenFCM);
//router.put("/TokenDispositivo/:Matricula", registerTokenFCM);
//router.put("/Documentacion/:Matricula", documentComplet);
//router.put("/terminarCargo/:Matricula", endCargo);
//router.put("/cambiarCargo/:Matricula", updateCargo)
//router.get("/infoCargo/:Id", getInfoCargo);

//export default router;

// adapter/routes/user.routes.js
import { Router } from "express";
import { makeInvoker } from "awilix-express";

const router = Router();

// Inyectamos el controlador
const api = makeInvoker((deps) => deps.userController);

router.get("/user/:Id", api("getUser"));
router.get("/userChecks/:EmailAsignador", api("getBuscarCheckers"));
router.get("/userMatricula/:Matricula", api("buscarUserMatricula"));
router.get("/buscarUser/:Nombre", api("buscarPersona"));
router.get("/VerToken/:Matricula", api("SearchTokenFCM"));
router.put("/TokenDispositivo/:Matricula", api("registerTokenFCM"));
router.put("/Documentacion/:Matricula", api("documentComplet"));
router.put("/terminarCargo/:Matricula", api("endCargo"));
router.put("/cambiarCargo/:Matricula", api("updateCargo"));
router.get("/infoCargo/:Id", api("getInfoCargo"));

export default router;
