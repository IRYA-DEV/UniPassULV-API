// src/adapter/routes/auth.routes.js
import { Router } from "express";
import { makeInvoker } from "awilix-express";

const router = Router();

// Inyección del controlador
const api = makeInvoker((deps) => deps.authController);

router.post("/login", api("loginUser"));
router.put("/password/:Correo", api("putPassword"));

export default router;
