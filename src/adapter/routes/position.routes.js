import {Router} from "express";
import { cambiarActivo, createPosition, getInfoDelegado } from "../controller/position.controller.js"

const router = Router();

router.get("/infoDelegado/:Id", getInfoDelegado)
router.post("/createPosition", createPosition);
router.put("/cambiarActivo/:Id", cambiarActivo);

export default Router;
