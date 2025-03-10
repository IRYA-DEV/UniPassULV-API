import { Router } from "express";
import { getUser, updateUser } from "../controller/user.controller.js";

const router = Router();

router.get("/user/:Id", getUser);
router.put("/user/:Id", updateUser);

export default router;
