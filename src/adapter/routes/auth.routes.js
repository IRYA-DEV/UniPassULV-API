import { Router } from "express";
import { loginUser, putPassword } from "../controller/auth.controller.js";

const router = Router();

router.post("/login", loginUser);

router.put("/password/:Correo", putPassword);

export default router;
